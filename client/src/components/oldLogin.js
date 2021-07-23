import React,{useState,useContext} from 'react';
import "../style/Register.css";
import { Link } from "react-router-dom";
import { Block } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import axios from '../utils/axios';
import { UserContext } from '../context/UserContext';
import { useSnackbar } from 'notistack';
export default function Login() {
    const {userState,userDispatch}=useContext(UserContext);
    const history = useHistory();
    const {enqueueSnackbar}=useSnackbar();
    const [loginValue,setloginValues]=useState({
        email:"",
        password:"",
    });
    const handleLogin=async(ev)=>{
        ev.preventDefault();
        try{
            const {data}=await axios.post("/api/user/login",loginValue);
            userDispatch({type:"LOGIN_USER",payload:data.payload});
            let accessToken=data.accessToken;
            localStorage.setItem("auth-token",accessToken);
            enqueueSnackbar("Logged in Successfully",{variant:"success"})
            history.push("/")
        }catch(err){
            console.log(err);
            userDispatch({type:"USER_ERROR",payload:err.response.data.msg});
            enqueueSnackbar("Invalid login credentials",{variant:"error"})
        }
    }
    const handleChange=(ev)=>{
        setloginValues((prev)=>({
            ...prev,[ev.target.id]:ev.target.value,
        }));
    }
    return (
        <>
            <form id="login-form" onSubmit={handleLogin} className="login-form" autoComplete="off" role="main">
                <h1 className="a11y-hidden">Login Form</h1>
                <div>
                    <label className="label-email">
                        <input id="email" type="email" value={loginValue.email} onChange={handleChange} className="input" name="email" placeholder="Email" tabIndex="1" required />
                        <span className="required">Email</span>
                    </label>
                </div>
                <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
                <label className="label-show-password" htmlFor="show-password">
                    <span>Show Password</span>
                </label>
                <div>
                    <label className="label-password">
                        <input id="password" type="text" value={loginValue.password} onChange={handleChange} className="input" name="password" placeholder="Password" tabIndex="2" required />
                        <span className="required">Password</span>
                    </label>
                </div>
                <div>
                <div style={{"display":Block}}>
                {/* <Link to='/Home'> */}
                    <input type="submit" value="Log In" />
                {/* </Link> */}
                </div>
                <Link to='/register'> 
                    <input type="submit" value="Create Account" />
                </Link> 
                </div>
                <div className="email">
                    <a>Forgot password?</a>
                </div>
                <figure aria-hidden="true">
                    <div className="person-body"></div>
                    <div className="neck skin"></div>
                    <div className="head skin">
                        <div className="eyes"></div>
                        <div className="mouth"></div>
                    </div>
                    <div className="hair"></div>
                    <div className="ears"></div>
                    <div className="shirt-1"></div>
                    <div className="shirt-2"></div>
                </figure>
            </form>
        </>
    )
}
