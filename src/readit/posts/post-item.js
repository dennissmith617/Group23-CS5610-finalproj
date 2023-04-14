import React from "react";
import PostStats from "./post-stats";
import {useDispatch} from "react-redux";
import {deletePostThunk} from "../../services/posts/post-thunk";

const PostItem = ({post ={
    "_id": 123,
    "topic": "2020",
    "userName": "George RR Martin",
    "time": "2h",
    "title": "George RR Martin finally publishes something",
    "image": "GRRM_profile.jpeg",
    "liked": true,
    "replies": 121,
    "reposts": 250,
    "likes": 2000,
    "handle": "@GRRMspeaking",
    "post": "2020 was directed by me"
    }}) => {
        const dispatch = useDispatch();
        const deletePostHandler = (id) => {
            dispatch(deletePostThunk(id));
        }
    return(
        <li className="list-group-item">
            <div className="row">
                <br/>
                <div className="col-auto">
                    <img width={50} className="float-start rounded-circle ms-1" src={`/images/${post.image}`}/>
                </div>
                <div className="col-10">
                    <div>
                        <i className="bi bi-x-lg float-end"
                            onClick={() => deletePostHandler(post._id)}></i>
                            <span className={"fw-bold"}>{post.userName}</span>
                            <span className={"ms-1"}>{post.handle}</span>
                            <span className={"ms-1"}>&middot;</span>
                            <span className={"ms-1"}>{post.time}</span>
                    </div>
                    <p className="wd-post-text">{post.post}</p>
                    <PostStats post={post}/>
                </div>
            </div>
        </li>
    );
    };

 export default PostItem;