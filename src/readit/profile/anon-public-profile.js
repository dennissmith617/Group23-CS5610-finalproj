import React, { useState, useEffect } from "react";
import * as userService from "../../services/users/users-service";
import {Link, useNavigate, useParams} from "react-router-dom";
import {profileThunk, updateUserThunk, findAllUsersThunk} from "../../services/users/users-thunks";
import { useDispatch, useSelector } from "react-redux";

function AnonymousPublicProfile() {
    const { uid } = useParams();
    const [profile, setProfile] = useState({followers:[]});
    const [users, setUsers] = useState([]);
    const {currentUser} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const getProfile = async () => {
        const action = await dispatch(profileThunk());
        setProfile(action.payload);
    };

    const getAllUsers = async () => {
        const action = await dispatch(findAllUsersThunk());
        setUsers(action.payload);
    };

    const getUserById = async () => {
        const user = await userService.findUserById(uid);
        setProfile(user);
    };

    useEffect(() => {
        if (uid) {
            getAllUsers().then(r => console.log("all users loaded"));
            getUserById().then(r => console.log("user loaded"));
        } else {
            getProfile();
        }
    }, [currentUser, uid]);

    const followHandler = () => {
        const currUser = (users.find((u) => u._id === currentUser._id));
        let newFollowingList = Array.from(currUser.following);
        let newFollowersList = Array.from(profile.followers);
        console.log(currUser);
        console.log(newFollowingList);
        if (profile.followers.includes(currentUser._id)) {
            const followingIndex = newFollowingList.indexOf(uid);
            if (followingIndex !== -1) {
                newFollowingList.splice(followingIndex, 1);
            }
            const followersIndex = newFollowersList.indexOf(currentUser._id);
            if (followersIndex !== -1) {
                newFollowersList.splice(followersIndex, 1);
            }
        } else {
            newFollowingList.push(uid);
            newFollowersList.push(currentUser._id);
        }
        const newCurrentUser = {...currUser, following: newFollowingList};
        const newProfileUser = {...profile, followers: newFollowersList};
        console.log(newCurrentUser.following);
        dispatch(updateUserThunk(newCurrentUser));
        dispatch(updateUserThunk(newProfileUser));
        getAllUsers();
        setProfile(newProfileUser);
    }

    const navigate = useNavigate();
    const registerHandler = () => {
        navigate('/readit/register');
    }

    if (profile) {
        return (
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
                <img src={`/images/books.jpeg`} width="100%" height={150} className="mt-2"/>
                <div className="row mt-5">
                    <div className="col-8">
                        <img src={profile.profilePicture} className="ms-4 wd-profile-img rounded-circle"/>
                    </div>
                    <span className="col-3 mt-2 ms-3">
                        {currentUser && 
                            <button onClick={followHandler} className={`rounded-pill btn ${(profile.followers.includes(currentUser._id)) ? "btn-dark" : "btn-outline-dark"} float-end fw-bold`}>{(profile.followers.includes(currentUser._id)) ? "Following" : "Follow"}</button>}
                        {!currentUser &&
                            <button onClick={registerHandler} className={`rounded-pill btn btn-primary float-end fw-bold`}>Register</button>}
                    </span>
                </div>
                <div className="ms-4 mt-3">
                    <b className="fs-5">{profile.firstName} {profile.lastName}</b>
                    <div className="wd-small-font wd-fg-color-lightgray">@{profile.username}</div>
                </div>
                <div className="row ms-3 mt-2">
                    <div className="col-6 mt-4">
                        {profile.following &&
                            <h5>Following ({profile.following.length})</h5>}
                        {profile.following &&
                            <ol>
                                {profile.following.map(f => {
                                        const curr = users.find((u) => u._id === f);
                                        try{
                                            return (
                                                <li><Link reloadDocument to={(currentUser && currentUser._id === curr._id) ? '/readit/profile' : `/readit/profile/${curr._id}`}>{curr.firstName} {curr.lastName}</Link>
                                                </li>
                                            )
                                        } catch (error) {
                                            console.log(error);
                                        }
                                        
                                    }
                                )}

                            </ol>}
                    </div>
                    <div className="col-6 mt-4">
                    {profile.following &&
                        <h5>Followers ({profile.followers.length})</h5>}
                    {profile.following &&
                        <ol>
                            {profile.followers.map(f => {
                                    const curr = users.find((u) => u._id === f);
                                    try {
                                        return (
                                            <li><Link reloadDocument to={(currentUser && currentUser._id === curr._id) ? '/readit/profile' : `/readit/profile/${curr._id}`}>{curr.firstName} {curr.lastName}</Link>
                                            </li>
                                        )
                                    } catch (err) {
                                        console.log(err);
                                    }
                                    
                                }
                            )}
                        </ol>}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default AnonymousPublicProfile;