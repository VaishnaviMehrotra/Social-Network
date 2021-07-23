import React, { useState, useContext} from "react";
import "../style/Register.css";
import { useHistory } from "react-router-dom";
import axios from '../utils/axios';
import { UserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";
export default function Register() {
    const { enqueueSnackbar } = useSnackbar();
    const { userState, userDispatch } = useContext(UserContext);
    const history = useHistory();
    const [registerValues, setRegisterValues] = useState({
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
    });
    const handleRegister = async (ev) => {
        ev.preventDefault();
        try {
            if (registerValues.password !== registerValues.repeatPassword) {
                return enqueueSnackbar("Password Doesn't match", { variant: "error" });
              }
            const { data } = await axios.post("/api/user/register", registerValues);
            let accessToken = data.accessToken;
            localStorage.setItem("auth-token", accessToken);
            userDispatch({ type: "REGISTER_USER", payload: data.payload });

            enqueueSnackbar("Registered Successfully", { variant: "success" });
            history.push("/")
        } catch (err) {
            userDispatch({ type: "USER_ERROR", payload: err.response.data.error });
            userState.error?.forEach((data) => {
              enqueueSnackbar(data, { variant: "error" });
            });
        }
      };
      const handleChange = (ev) => {
        setRegisterValues((prev) => ({
          ...prev,
          [ev.target.name]: ev.target.value,
        }));
      };
    return (
        <div>
            <form id="login-form" className="login-form" autoComplete="off" role="main" onSubmit={handleRegister}>
                <h1 className="a11y-hidden">Register Form</h1>
                <div>
                    <label className="label-email">
                        <input type="Name" className="Name" name="name" placeholder="Name" tabIndex="1" onChange={handleChange} value={registerValues.name} required />
                        <span className="required">Name</span>
                    </label>
                </div>
                <div>
                    <label className="label-email">
                        <input type="email" className="text" name="email" placeholder="Email" tabIndex="1" onChange={handleChange} value={registerValues.email} required />
                        <span className="required">Email</span>
                    </label>
                </div>
                <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
                <label className="label-show-password" htmlFor="show-password">
                    <span>Show Password</span>
                </label>
                <div>
                    <label className="label-password">
                        <input type="text" className="text" name="password" placeholder="Password" tabIndex="2" onChange={handleChange} value={registerValues.password} required />
                        <span className="required">Password</span>
                    </label>
                </div>
                <div>
                    <label className="label-password">
                        <input type="text" className="text" name="repeatPassword" placeholder="Repeat Password" tabIndex="2" onChange={handleChange} value={registerValues.repeatPassword} required />
                        <span className="required">Repeat Password</span>
                    </label>
                </div>
                <div>

                <input type="submit" value="Submit"/>
                     
                </div>
                <div className="email">
                    <a href="#">Forgot password?</a>
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
        </div>
    )
}
