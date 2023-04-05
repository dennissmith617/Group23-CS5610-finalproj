import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./index.css";
import { findUserByIdThunk, updateUserThunk } from "../../services/users/users-thunks.js";
import { useDispatch, useSelector } from "react-redux";
import mongoose from 'mongoose';

const ProfilePublicComponent = (
) => {
    const {vid} = useParams();
    let state = useSelector((state) => state.users)
    let { currentUser } = useSelector((state) => state.users);
    try {
        currentUser = state.users.find((u) => u._id === vid);
    } catch(error) {
        console.log(error);
    }
    const {users} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    console.log(currentUser);
    useEffect(() => {
        dispatch(findUserByIdThunk(vid));
    }, []);
    const profile = currentUser;
    const {lid} = useParams();
    const [following, setFollowing] = useState((state.users.find((u) => u._id === lid)).following.includes(vid));
    const followHandler = () => {
        let newFollowingList = Array.from((state.users.find((u) => u._id === lid)).following);
        let newFollowersList = Array.from((state.users.find((u) => u._id === vid)).followers);
        if (following) {
            newFollowingList = newFollowingList.filter((u) => u._id !== vid);
            newFollowersList = newFollowersList.filter((u) => u._id !== lid);
        } else {
            newFollowingList.push(new mongoose.Types.ObjectId(lid));
            newFollowersList.push(new mongoose.Types.ObjectId(vid));
        }
        const newLidUser = {...(state.users.find((u) => u._id === lid)), following: newFollowingList};
        const newVidUser = {...(state.users.find((u) => u._id === vid)), followers: newFollowersList};
        console.log(users);
        // dispatch(updateUserThunk(newLidUser));
        // dispatch(updateUserThunk(newVidUser));
        setFollowing(!following);
    }
    const navigate = useNavigate();
    if (vid === lid) {
        navigate("/readit/profile");
        return;
    }
    return(
        <div>
            <div className="row">
                <div className="col-1">
                    <i className="fs-4 bi bi-book"></i>
                </div>
                <div className="col-10">
                    <b className="fs-3">{profile.firstName} {profile.lastName}</b>
                    <div className="fs-6"><b>{profile.role}</b></div>
                    <div className="wd-small-font wd-fg-color-lightgray">{profile.booksRead} Books Read {`${(profile.role === "CRITIC" || profile.role === "AUTHOR") ? `| ${profile.comments.length} Reviews Posted` : ''}`} {`${(profile.role === "AUTHOR") ? `| ${profile.numBooksWritten} Books Written` : ''}`} </div>
                </div>
            </div>
            <img src={`/images/books.jpeg`} width="100%" height={150} className="mt-2" />
            <div className="row mt-5">
                <div className="col-8">
                    <img src={profile.profilePicture} className="ms-4 wd-profile-img rounded-circle"/>
                </div>
                <span className="col-3 mt-2 ms-3">
                    <button onClick={followHandler} className={`rounded-pill btn ${(following) ? "btn-dark" : "btn-outline-dark"} float-end fw-bold`}>{(following) ? "Following" : "Follow"}</button>
                </span>
            </div>
            <div className="ms-4 mt-3">
                <b className="fs-5">{profile.firstName} {profile.lastName}</b>
                <div className="wd-small-font wd-fg-color-lightgray">@{profile.username}</div>
            </div>
            <div className="row ms-3 mt-2">
                <div className="col-6 mt-4">
                    <h5>Following ({currentUser.following.length})</h5>
                    <ol>
                        {currentUser.following.map(f => {
                            const curr = users.find((u) => u._id === f);
                            return (
                                <li><Link to={`/readit/profile/${lid}/${f}`}>{curr.firstName} {curr.lastName}</Link></li>
                            )
                        }
                        )}
                        
                    </ol>
                </div>
                <div className="col-6 mt-4">
                    <h5>Followers ({currentUser.followers.length})</h5>
                    <ol>
                        {currentUser.followers.map(f => {
                            const curr = users.find((u) => u._id === f);
                            return (
                                <li><Link to={`/readit/profile/${lid}/${f}`}>{curr.firstName} {curr.lastName}</Link></li>
                            )}
                            )}
                    </ol>
                </div>
            </div>
            {/* <div className="ms-3 mt-4" hidden={`${(profile.role === "VIEWER") ? 'hidden' : ''}`}>
                <h5>Comments Posted:</h5>
                <ul>
                    {profile.comments.map(c => <li>"{c}"</li>)}
                </ul>
            </div> */}
        </div>
    );
};
export default ProfilePublicComponent;