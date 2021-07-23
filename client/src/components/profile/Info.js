import React, { useState, useContext } from 'react'

import FollowBtn from './FollowBtn'
import EditProfile from './EditProfile'
import { UserContext } from '../../context/UserContext';
// import Followers from './Followers'
// import Following from './Following'
// import UserCard from './UserCard'
import '../../style/Profile.css';
import Person from '../../images/person1.jpg';
const Info = () => {
    const {userState}=useContext(UserContext);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <div className="info">
            <div className="info_container" >
                <img src={Person} className="supper-avatar" />
                <div className="info_content">
                    <div className="info_content_title">
                        {/* {console.log(userState.user)} */}
                        <h2>{userState.user?.name}</h2>
                        <button className="btn btn-outline-info" onClick={handleClickOpen}>
                            Edit Profile
                        </button>
                        {/* <FollowBtn /> */}
                    </div>
                    <div className="follow_btn">
                        <span className="mr-4" >
                            Followers
                        </span>
                        <span className="ml-4">
                            Following
                        </span>
                    </div>
                    <h6>City<span className="text-danger">{userState.user?.city}</span></h6>
                    <p className="m-0">{userState.user?.bio}</p>
                    <h6 className="m-0">Gender</h6>
                    <a target="_blank" rel="noreferrer">
                    {userState.user?.gender}
                    </a>
                    {/* <p>vcvcv</p> */}
                </div>
                {
                    open && <EditProfile setOpen={setOpen} />
                }
                {/* <Followers  /> */}
                {/* <Following/> */}
            </div>
        </div>
    )
}
export default Info;