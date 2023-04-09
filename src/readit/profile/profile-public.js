import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./index.css";
import { findUserByIdThunk, updateUserThunk } from "../../services/users/users-thunks.js";
import { useDispatch, useSelector } from "react-redux";

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
    const {lid} = useParams();
    const lidUser = state.users.find((u) => u._id === lid);
    let [following, setFollowing] = useState(lidUser.following.includes(vid));
    if (lidUser.following.includes(vid) !== following) {
        setFollowing(lidUser.following.includes(vid));
    }
    
    const followHandler = () => {
        let newFollowingList = Array.from(lidUser.following);
        let newFollowersList = Array.from(lidUser.followers);
        if (following) {
            newFollowingList.pop(vid);
            newFollowersList.pop(lid);
        } else {
            newFollowingList.push(vid);
            newFollowersList.push(lid);
        }
        
        const newLidUser = {...(state.users.find((u) => u._id === lid)), following: newFollowingList};
        const newVidUser = {...(state.users.find((u) => u._id === vid)), followers: newFollowersList};
        dispatch(updateUserThunk(newLidUser));
        dispatch(updateUserThunk(newVidUser));
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
                    <b className="fs-3">{currentUser.firstName} {currentUser.lastName}</b>
                    <div className="fs-6"><b>{currentUser.role}</b></div>
                    <div className="wd-small-font wd-fg-color-lightgray">{currentUser.booksRead} Books Read {`${(currentUser.role === "CRITIC" || currentUser.role === "AUTHOR") ? `| ${currentUser.comments.length} Reviews Posted` : ''}`} {`${(currentUser.role === "AUTHOR") ? `| ${currentUser.numBooksWritten} Books Written` : ''}`} </div>
                </div>
            </div>
            <img src={`/images/books.jpeg`} width="100%" height={150} className="mt-2" />
            <div className="row mt-5">
                <div className="col-8">
                    <img src={currentUser.profilePicture} className="ms-4 wd-profile-img rounded-circle"/>
                </div>
                <span className="col-3 mt-2 ms-3">
                    <button onClick={followHandler} className={`rounded-pill btn ${(following) ? "btn-dark" : "btn-outline-dark"} float-end fw-bold`}>{(following) ? "Following" : "Follow"}</button>
                </span>
            </div>
            <div className="ms-4 mt-3">
                <b className="fs-5">{currentUser.firstName} {currentUser.lastName}</b>
                <div className="wd-small-font wd-fg-color-lightgray">@{currentUser.username}</div>
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