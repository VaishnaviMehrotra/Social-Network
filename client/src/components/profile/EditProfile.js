import React, { useState, useContext} from 'react';
import axios from '../../utils/axios';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import { useSnackbar } from 'notistack';

const EditProfile = ({setOpen}) => {
    const {userState,userDispatch}=useContext(UserContext);
    const history = useHistory();
    const {enqueueSnackbar}=useSnackbar();
    const [updatedValues,setUpdatedValues]=useState({
        name:"",
        city:"",
        bio: "",
        gender: "",
        image: "",
    });
    const handleSubmit=async(ev)=>{
        ev.preventDefault();
        try{
            const {data}=await axios.put("/api/user/update",updatedValues);
            userDispatch({type:"UPDATE_USER",payload:data});
            enqueueSnackbar("Profile Updated Successfully",{variant:"success"})
            history.push("/profile")
        }catch(err){
            console.log(err);
            userDispatch({type:"USER_ERROR",payload:err.response.data.msg});
            enqueueSnackbar("Invalid credentials",{variant:"error"})
        }
    }
    const handleChangeInput=(ev)=>{
        setUpdatedValues((prev)=>({
            ...prev,[ev.target.name]:ev.target.value,
        }));
    }
    return (
        <>
        <div className="edit_profile">
            <button className="btn btn-danger btn_close" 
            onClick={() => setOpen(false)}
            >
                Close
            </button>
           
            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src=""
                    alt="avatar"  />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="image" id="file_up"
                        accept="image/*" onChange={handleChangeInput} value={updatedValues.image}/>
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="name"
                        name="name" value="" onChange={handleChangeInput} value={updatedValues.name}/>
                        <small className="text-danger position-absolute"
                        style={{top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="City">City</label>
                    <input type="text" name="city" 
                    className="form-control" onChange={handleChangeInput} value={updatedValues.city}/>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address"
                    className="form-control"  />
                </div> */}
                {/* <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" 
                    className="form-control"  />
                </div> */}
                <div className="form-group">
                    <label htmlFor="Bio">Bio</label>
                    <textarea name="bio"  cols="30" rows="4"
                    className="form-control" onChange={handleChangeInput} value={updatedValues.bio}/>
                    {/* <small className="text-danger d-block text-right">
                       Hello world
                    </small> */}
                </div>
                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" 
                    className="custom-select text-capitalize" value={updatedValues.gender}
                    onChange={handleChangeInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
        </>
    )
}
export default EditProfile