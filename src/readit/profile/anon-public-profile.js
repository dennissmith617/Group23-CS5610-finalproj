import React, { useState, useEffect } from "react";
import * as userService from "../../services/users/users-service";
import {Link, useNavigate, useParams} from "react-router-dom";
import {profileThunk, updateUserThunk, findAllUsersThunk} from "../../services/users/users-thunks";
import { useDispatch, useSelector } from "react-redux";
import ProfilePublicComponent from "./profile-public";
import uuid from "uuid";

function AnonymousPublicProfile() {
    const { uid } = useParams();
    const [profile, setProfile] = useState({});
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

    const [following, setFollowing] = useState((currentUser) ? currentUser.following.includes(uid) : false);

    useEffect(() => {
        if (uid) {
            getAllUsers().then(r => console.log("all users loaded"));
            getUserById().then(r => console.log("user loaded"));
        } else {
            getProfile();
        }
        if (currentUser) {
            setFollowing(currentUser.following.includes(uid));
        }
    }, [currentUser, uid]);

    //fix functionality
    const followHandler = () => {
        let newFollowingList = Array.from(currentUser.following);
        let newFollowersList = Array.from(profile.followers);
        if (following) {
            newFollowingList.pop(uid);
            newFollowersList.pop(currentUser._id);
        } else {
            newFollowingList.push(uid);
            newFollowersList.push(currentUser._id);
        }
        const newLidUser = {...(users.find((u) => u._id === currentUser._id)), following: newFollowingList};
        const newVidUser = {...profile, followers: newFollowersList};
        console.log(newVidUser);
        //updateUserThunk not updating database
        dispatch(updateUserThunk(newLidUser));
        dispatch(updateUserThunk(newVidUser));
        setFollowing(!following);
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
                            <button onClick={followHandler} className={`rounded-pill btn ${(following) ? "btn-dark" : "btn-outline-dark"} float-end fw-bold`}>{(following) ? "Following" : "Follow"}</button>}
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
                                        return (
                                            <li><Link reloadDocument to={(currentUser && currentUser._id === curr._id) ? '/readit/profile' : `/readit/profile/${curr._id}`}>{curr.firstName} {curr.lastName}</Link>
                                            </li>
                                        )
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
                                    return (
                                        <li><Link reloadDocument to={(currentUser && currentUser._id === curr._id) ? '/readit/profile' : `/readit/profile/${curr._id}`}>{curr.firstName} {curr.lastName}</Link>
                                        </li>
                                    )
                                }
                            )}
                        </ol>}
                    </div>
                </div>
                {/* <div className="ms-3 mt-4" hidden={`${(profile.role === "VIEWER") ? 'hidden' : ''}`}>
                <h5>Comments Posted:</h5>
                <ul>
                    {profile.comments.map(c => <li>"{c}"</li>)}
                </ul>
            </div> */}
            {/**add another section for books read?  */}
            </div>
        );
    }
}

export default AnonymousPublicProfile;