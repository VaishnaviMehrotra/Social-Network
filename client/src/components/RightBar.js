import React from 'react';
import "../style/RightBar.css";
import PersonImg from "../images/person1.jpg";
export default function RightBar() {
    return (
        <div className="RightBar">
            <div className="rightWrapper">
                <h4 className="rightBarTitle">Online Friends</h4>
                <ul className="rightBarFriendList">
                    <li className="rightBarFriend">
                        <div className="rightBarImgContainer">
                            <img src={PersonImg} alt="" className="rightBarImg" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className="rightBarUsername">Vaish</span>
                    </li>
                    <li className="rightBarFriend">
                        <div className="rightBarImgContainer">
                            <img src={PersonImg} alt="" className="rightBarImg" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className="rightBarUsername">Vaish</span>
                    </li>
                    <li className="rightBarFriend">
                        <div className="rightBarImgContainer">
                            <img src={PersonImg} alt="" className="rightBarImg" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className="rightBarUsername">Vaish</span>
                    </li>
                    <li className="rightBarFriend">
                        <div className="rightBarImgContainer">
                            <img src={PersonImg} alt="" className="rightBarImg" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className="rightBarUsername">Vaish</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}