import React, { useEffect, useContext } from 'react';
// import "../style/Home.css";
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import CenterBar from './CenterBar';
import HomePage from './HomePage';
import Header from './Header';
export default function Home() {
    const history = useHistory();
    const { userState, userDispatch } = useContext(UserContext)
    useEffect(() => {
        if (!userState.authenticated) {
            history.push("/login");
        }
    }, [])
    return (
        <div>
            {/* <TopBar /> */}
            <HomePage/>
            <div className="mainContainer">
                {/* <LeftBar /> */}
                <CenterBar />
                {/* <RightBar/> */}
            </div>
        </div>
    )
}