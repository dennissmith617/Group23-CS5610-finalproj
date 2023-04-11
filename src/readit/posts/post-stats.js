import React from "react";

const PostStats = ({post ={
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
        return (
            <div className={'row'}>
                <div className={'col-3'}>
                    <i className="bi bi-chat"></i>
                    <span className={'ms-2'}>{post.replies}</span>
                </div>
                <div className={'col-3'}>
                    <i className="bi bi-arrow-repeat"></i>
                    <span className={'ms-2'}>{post.reposts}</span>
                </div>
                <div className={'col-3'}>
                    <i className={post.liked? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
                    <span className={'ms-2'}>{post.likes}</span>
                </div>
                <div className={'col-3'}>
                    <i className="bi bi-share"></i>
                </div>
            </div>
        )

    }

export default PostStats;