import React, { useEffect, useState } from "react";
import { describeUser } from '../common/operations';
import decode from 'jwt-decode';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const token = window.localStorage.getItem("token");
    const { userId } = decode(token);

    useEffect(() => {
        const fetchData = async () => {
            const profileResponse = await describeUser(userId);
            setProfile(profileResponse);
        };
        fetchData();
    }, [userId]);

    return(
        <div className= 'login-container' style={{color: 'white'}}>
        <div></div>

        <div className='login-form-container'>
          <h3>{profile.firstName+' '+profile.lastName}</h3>
        </div>

      </div>
    );


};

export default Profile;