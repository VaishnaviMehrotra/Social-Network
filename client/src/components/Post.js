import React, { useState, useContext, useEffect } from 'react';
import "../style/Post.css";
import PersonImg from "../images/person1.jpg";
import { MoreVert, Favorite, ThumbUpAlt } from '@material-ui/icons';
import { PostContext } from "../context/PostContext";
import axios from "../utils/axios";
import Button from '@material-ui/core/Button';
import { useSnackbar } from "notistack";
import Picker from 'emoji-picker-react';

export default function Post(props) {
    const { postState, postDispatch } = useContext(PostContext);
    const [like, setLike] = useState(props.post.likes.length);
    const [isLike, setIsLike] = useState(false)
    const [allComments, setAllComments] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const [comment, setComment] = useState("");

    async function getAllComments() {
        try {
            const { data } = await axios.get(`/api/comment/${props.post._id}`);
            postDispatch({ type: "COMMENTS_LOADED", payload: data });
            console.log(data);
            setAllComments(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleComment = async (ev) => {
        ev.preventDefault();
        try {
            if (comment === "") {
                return enqueueSnackbar("Empty Comment", { variant: "error" });
            }
            const { data } = await axios.post(`/api/comment/${props.post._id}`, { comment: comment });
            postDispatch({ type: "POST_COMMENTS", payload: data });
            enqueueSnackbar("Posted Successfully", { variant: "success" });
        } catch (err) {
            // postDispatch({ type: "USER_ERROR", payload: err.response.data.error });
            //   enqueueSnackbar("error", { variant: "error" });
            console.log(err);
        }
    };
    const handleLike = async (ev) => {
        ev.preventDefault();
        try {
            const { data } = await axios.put(`/api/post/likes/${props.post._id}`);
            postDispatch({ type: "LIKE_LOADED", payload: data });
            setLike(isLike ? like - 1 : like + 1);
            setIsLike(!isLike);
        } catch (err) {
            // postDispatch({ type: "USER_ERROR", payload: err.response.data.error });
            //   enqueueSnackbar("error", { variant: "error" });
            console.log(err);
        }
    };
    useEffect(() => {
        getAllComments();
        
    }, []);
    let month = new Date(props.post.createdAt).toLocaleString("default", {
        month: "short",
    });
    let day = new Date(props.post.createdAt).getDate();
    let year = new Date(props.post.createdAt).getFullYear();
    let time = new Date(props.post.createdAt).getMinutes();
    let hour = new Date(props.post.createdAt).getHours();
    return (
        <div className="post" style={{ background: "white" }}>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postTopImg" src={PersonImg} alt="" />
                        <span className="postUser">{props.post.user.name}</span>
                        <span className="postDate">{`${month} ${day} ${year} ${hour}:${time}`}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="text">{props.post.content}</span>
                    <img src={props.post.image} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {isLike ? (<>
                            <Favorite htmlColor="red" className="likeIcon" onClick={handleLike} />
                            <span className="postLikeCounter">{props.post.likes.length} Likes</span>
                        </>)

                            :
                            (
                                <>
                                    <Favorite htmlColor="grey" className="likeIcon" onClick={handleLike} />
                                    <span className="postLikeCounter">{props.post.likes.length} Likes</span>
                                </>
                            )}
                        {/* <Favorite htmlColor="grey" className="likeIcon" onClick={handleLike}/> */}
                        {/* <ThumbUpAlt htmlColor="blue" className="likeIcon" /> */}
                        {/* <span className="postLikeCounter">{props.post.likes.length} Likes</span> */}
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{allComments.length} comments</span>
                    </div>
                </div>
                {/* <hr class="solid" style={{borderTop: "1px solid black", maxWidth:"100%"}}></hr> */}
                <div className="comments">
                    <input type="text" value={comment} className="postComment" placeholder="Add a comment.." onChange={(ev) => setComment(ev.target.value)}>
                    </input>
                    <Button variant="contained" color="primary" onClick={handleComment}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}