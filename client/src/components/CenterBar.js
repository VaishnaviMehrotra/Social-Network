import React, { useState, useContext, useEffect, useRef } from 'react';
import "../style/CenterBar.css";
import Post from './Post';
import PersonImg from "../images/person1.jpg";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { PostContext } from "../context/PostContext";
import axios from "../utils/axios";
import { useSnackbar } from "notistack";
export default function CenterBar() {
    const { postState, postDispatch } = useContext(PostContext);
    const [allPost, setAllPost] = useState(0);
    const [post, setPost] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const content = useRef();
    const [file, setFile] = useState(null);

    async function getAllPost() {
        try {
            const { data } = await axios.get("/api/post");
            postDispatch({ type: "POSTS_LOADED", payload: data });
            setAllPost(data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }))
        }
        catch (err) {
            console.log(err);
        }
    }
    // const handleChange=(ev)=>{
    //     setPost((prev)=>({
    //         ...prev,[ev.target.name]:ev.target.value,
    //     }));
    // }
    const handlePost = async (e) => {
        e.preventDefault();
        if (file) {
            const fileData = new FormData();
            var fileName = Date.now() + file.name;
            console.log(fileName)
            fileData.append("file", file);
            fileData.append("name", fileName);
            // post.image=fileName;
            try {
                await axios.post("/upload", fileData)
            }
            catch (err) {
                console.log(err);
            }
        }

        try {
            // await axios.post(`/api/post`, newPost);
            console.log(fileName)
            const { data } = await axios.post(`/api/post`, { content: post, image: fileName });
            console.log(data)
            postDispatch({ type: "ADD_POST", payload: data });
            enqueueSnackbar("Posted Successfully", { variant: "success" });
            window.location.reload();
        } catch (err) {
            // postDispatch({ type: "USER_ERROR", payload: err.response.data.error });
            //   enqueueSnackbar("error", { variant: "error" });
            console.log(err);
        }

    };
    useEffect(() => {
        getAllPost();
    }, []);
    return (
        <div className="CenterBar">
            <div className="centerWrapper">
                <div className="share" style={{ background: "white" }}>
                    <div className="shareWrapper">
                        <div className="shareTop">
                            <img className="shareProfileImg" src={PersonImg} alt="" />
                            <input type="text" className="shareInput"
                                placeholder="What is in your mind"
                                onChange={(ev) => setPost(ev.target.value)}
                                value={post}
                                ref={content}>
                            </input>
                        </div>
                        <hr className="hr" />
                        <form className="shareBottom" onSubmit={handlePost}>
                            <div className="option">
                                <label htmlFor="file" className="options">
                                    <PermMedia htmlColor="tomato" className="icon" />
                                    {/* <span className="optionText">Photo or Video</span> */}
                                    <input type="file" id="file"
                                        accept=".png,.jpeg,.jpg"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }} />
                                </label>
                                {/* <div className="options">
                                    <Label htmlColor="blue" className="icon" />
                                    <span className="optionText">Tag</span>
                                </div>
                                <div className="options">
                                    <Room htmlColor="green" className="icon" />
                                    <span className="optionText">Loaction</span>
                                </div> */}
                                <div className="options">
                                    <EmojiEmotions htmlColor="goldenrod" className="icon" />
                                    {/* <span className="optionText">Feelings</span> */}
                                </div>
                            </div>
                            <button className="btn" type="submit">Post</button>
                        </form>
                    </div>
                </div>
                {postState.posts.slice(0).map((post) => {
                    return (
                        <Post post={post} key={post._id} />
                    );
                })}
            </div>
        </div>
    )
}