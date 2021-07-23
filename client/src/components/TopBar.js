import React,{useContext} from 'react';
import "../style/TopBar.css";
import PersonImg from "../images/person1.jpg";
import {Search,Person,Chat,Notifications,Home } from "@material-ui/icons"
import { UserContext } from '../context/UserContext';
export default function TopBar() {
    const {userState,userDisptch} = useContext(UserContext);
    return (
        <div className="TopContainer">
            <div className="topLeft">
                <span className="logo">Social Media App</span>
            </div>
            <div className="topCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input className="searchInput" placeholder="Search for friend, post or video"/>
                </div>
            </div>
            <div className="topRight">
                {/* <div className="topBarLink">
                    <span className="topLink">HomePage</span>
                    <span className="topLink"></span>
                </div> */}
                <div className="topBarIcon">
                <div className="iconItem">
                        <Home/>
                        <span className="IconMess">1</span>
                    </div>
                <div className="iconItem">
                        <Person/>
                        <span className="IconMess">2</span>
                    </div>
                    <div className="iconItem">
                        <Chat/>
                        <span className="IconMess">3</span>
                    </div>
                    <div className="iconItem">
                        <Notifications/>
                        <span className="IconMess">4</span>
                    </div>
                </div>
                <img src={PersonImg} alt=""  className="topImg" />
                {/* <p>{userState.user.name}</p> */}
            </div>
        </div>
    );
}