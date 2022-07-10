import decode from 'jwt-decode';

const isAdmin = () => {
    const token = window.localStorage.getItem("token");
    let payload;

    try {
        payload = decode(token);
    } catch (err) {
        return false;
    }

    return payload.isAdmin;

};

export default isAdmin;