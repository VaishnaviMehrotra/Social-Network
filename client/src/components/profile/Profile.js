import React from 'react'
import Info from './Info'
import CenterBar from '../CenterBar'
import HomePage from '../HomePage'
// import Posts from './PostProfile'
// import Saved from './Saved'
// import LoadIcon from '../../images/loading.gif'
const Profile = () => {
    return (
        <div className="profile">
            <HomePage/>
            <Info />
            <div className="profile_tab">
                <button >All Posts</button>
                {/* <button>Saved</button> */}
            </div>
            <CenterBar/>
            {/* <img className="d-block mx-auto" alt="loading" />
            saveTab */}
            {/* <Saved  /> */}
            {/* <Posts  /> */}
        </div>
    )
}
export default Profile;