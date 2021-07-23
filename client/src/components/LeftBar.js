import React from 'react';
// import "../style/LeftBar.css";
import {Chat,PlayCircleFilled,Group,Bookmarks,WorkOutline,Event} from '@material-ui/icons';
export default function LeftBar() {
    return (
        <div className="leftBar">
            <div className="leftWrapper">
                <ul className="list">
                    <li className="item">
                        <Chat className="icon"/>
                        <span className="iconText">Chats</span>
                    </li>
                    <li className="item">
                        <PlayCircleFilled className="icon"/>
                        <span className="iconText">Videos</span>
                    </li>
                    <li className="item">
                        <Group className="icon"/>
                        <span className="iconText">Group</span>
                    </li>
                    <li className="item">
                        <Bookmarks className="icon"/>
                        <span className="iconText">Bookmarks</span>
                    </li>
                    <li className="item">
                        <WorkOutline className="icon"/>
                        <span className="iconText">Jobs</span>
                    </li>
                    <li className="item">
                        <Event className="icon"/>
                        <span className="iconText">Events</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}