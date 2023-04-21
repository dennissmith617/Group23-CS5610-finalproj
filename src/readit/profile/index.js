import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";

import {getCommentsByBookId, getCommentsByUserId} from "../../services/comments/comments-service";
import { findAllUsersThunk, profileThunk } from "../../services/users/users-thunks";
import CommentItem from "../details/comments/commentItem";

import { useNavigate } from "react-router-dom";

const ProfileComponent = (
    {currentUser1 = { "_id": 1, "role": "AUTHOR", "username": "dummy", "email": "test@test.com",
        "firstName": "Dummy", "lastName": "User", "age": 30,
        "profilePicture": "../../images/defaultProPic.jpeg",
        "followers": [1, 2, 3], "following": [1, 2, 3, 4, 5], "comments": ["c1", "c2"], "booksRead": 6789, "numBooksWritten": 45
    }}
) => {
    let state = useSelector((state) => state.users);
    const [commentsArray, setCommentsArray] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {currentUser} = useSelector((state) => state.users);

    try {
        currentUser = state.users.find((u) => u._id === state.currentUser._id);
    } catch(error) {
        console.log(error);
    }
    const fetchCommentsByUserId= async () => {
        const response = await getCommentsByUserId(currentUser.username);
        console.log(response);
        setCommentsArray(response.reverse());
    }
    useEffect(() => {
        dispatch(findAllUsersThunk());
        dispatch(profileThunk());
        //current user currently undefined.
        fetchCommentsByUserId("6429871025911bc4641acf1e")

    }, []);

    const register = () => {
        try {
            navigate("/readit/register");
        } catch (err) {
            console.log(err);
        }
    };

    const {users} = useSelector((state) => state.users);

    if (!currentUser) {
        return (
            <button onClick={register} className="btn btn-primary">
                Sign up for an Account Here!
            </button>
        );
    }

    return(
        <div>
            <div className="row">
                <div className="col-1">
                    <i className="fs-4 bi bi-book"></i>
                </div>
                <div className="col-10">
                    <b className="fs-3">Hi {currentUser.firstName}!</b>
                    <div className="fs-6"><b>{currentUser.role}</b></div>
                    <div className="wd-small-font wd-fg-color-lightgray">{currentUser.booksRead} Books Read {`${(currentUser.role === "CRITIC" || currentUser.role === "AUTHOR") ? `| ${currentUser.comments.length} Reviews Posted` : ''}`} {`${(currentUser.role === "AUTHOR") ? `| ${currentUser.numBooksWritten} Books Written` : ''}`} </div>
                </div>
            </div>
            <img src={`/images/books.jpeg`} width="100%" height={150} className="mt-2" />
            <div className="row mt-5">
                <div className="col-8">
                    <img src={currentUser.profilePicture} className="ms-4 wd-profile-img rounded-circle"/>
                </div>
                <Link to="/readit/edit-profile/" className=" col-3 mt-2 ms-3">
                    <button className=" rounded-pill btn btn-outline-dark float-end fw-bold">Edit profile</button>
                </Link>

            </div>
            <div className="ms-4 mt-3">
                <b className="fs-5">{currentUser.firstName} {currentUser.lastName}</b>
                <div className="wd-small-font wd-fg-color-lightgray">@{currentUser.username}</div>

                <div className="wd-fg-color-lightgray mt-2">
                    <span className="pe-3">
                        <i className="bi bi-envelope"> </i>
                        {currentUser.email}
                    </span>
                    <span className="pe-3">
                        <i className="bi bi-balloon"> </i>
                        {currentUser.age} years old
                    </span>
                </div>
            </div>
            <div className="row ms-3 mt-2">
                <div className="col-6 mt-4">
                    <h5>Following ({currentUser.following.length})</h5>
                    <ol>
                        {currentUser.following.map(f => {
                                let curr = users.find((u) => u._id === f);
                                try {
                                    return (
                                        <li><Link to={`${currentUser._id}/${f}`}>{(curr.firstName) ? `${curr.firstName} ${curr.lastName}`: ''}</Link></li>
                                    )
                                } catch(error) {
                                    console.log(error);
                                    return<></>;
                                }
                            }
                        )}

                    </ol>
                </div>
                <div className="col-6 mt-4">
                    <h5>Followers ({currentUser.followers.length})</h5>
                    <ol>
                        {currentUser.followers.map(f => {
                            const curr = users.find((u) => u._id === f);
                            try {
                                return (
                                    <li><Link to={`${currentUser._id}/${f}`}>{(curr.firstName) ? `${curr.firstName} ${curr.lastName}`: ''}</Link></li>
                                )
                            } catch(error) {
                                console.log(error);
                                return<></>;
                            }})}
                    </ol>
                </div>
            </div>
            <div className="row">
                <ul className="list-group">
                    <li className="list-group-item text-lg-center fw-bold" style={{fontSize:20}}> Reviews </li>
                    {commentsArray.map(comment => <CommentItem comment = {comment}/>)
                    }
                </ul>

            </div>
            {/*<div className="ms-3 mt-4" hidden={`${(currentUser.role === "VIEWER") ? 'hidden' : ''}`}>
                <h5>Reviews Posted:</h5>
                <ul>
                    {currentUser.comments.map(c => <li>"{c}"</li>)}
                </ul>
            </div> */}
        </div>
    );
};
export default ProfileComponent;