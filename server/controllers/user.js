const argon2 = require('argon2');
const User = require('../models/user');
const { createToken } = require('../utils/user')

exports.login = async (req, res) => {
    let user;
    user = await User.findOne({ username: req.body.username });
    
    //user already exists
    if (user == null){
        user = await User.findOne({ email: req.body.username });

        if (user == null){
            res.json({ 
                token: '',
                error: true
            });
            return;
        }
    }
    //password validation
    const isValid = await argon2.verify(user.password, req.body.password);
    if (!isValid){
        res.json({ 
            token: '',
            error: true
        });
        return;
    };

    //isUserEnabled validation
    if(!user.enabled){
        res.json({ 
            token: '',
            error: true
        });
        return;
    };


    const token = createToken(user._id, user.isAdmin);

    res.json({
        token,
        error: false
    });
};

exports.register = async (req, res) => {
    const hasUsername = await User.findOne({ username: req.body.username });
    const hasEmail = await User.findOne({ email: req.body.email });
    const { adminCode } = req.body;

    if (hasUsername !== null) {
        res.json({ 
            token: '',
            error: true
        });
    } 

    else if (hasEmail !== null) {
        res.json({ 
            token: '',
            error: true
        });
    } 

    else if (adminCode !== null && adminCode !== process.env.ADMIN_CODE){
        res.json({ 
            token: '',
            error: true
        });
    }

    else {
        const hashedPassword = await argon2.hash(req.body.password);
        const userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            isAdmin: adminCode === process.env.ADMIN_CODE,
            enabled: adminCode === process.env.ADMIN_CODE
        };

        const user = await new User(userInfo).save();
        const token = createToken(user._id, user.isAdmin);

        res.json({
            token: user.isAdmin? token:'',
            error: false
        });
    }
};

exports.deleteUser = async (req, res) => {
    await User.deleteOne({ _id: req.params.userId });
    res.json({ message: 'User has been deleted.' });
};

exports.describeUser = async (req, res) => {
    const user = await User.findOne({ _id : req.body.userId });

    res.json(user);
};

exports.inviteUser = async (req, res) => {

    const admin = await User.findOne({ _id: req.body.adminId});

    if (admin.isAdmin) {
        await User.updateOne({ _id: req.body.userId}, { enabled: true });

        res.json({
            error: false,
            message: "User was enabled succesfully."
        });
    
        return;
    };

    res.json({
        error: true,
        message: "Permission denied."
    });
};