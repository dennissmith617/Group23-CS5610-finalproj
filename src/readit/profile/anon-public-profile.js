import React, { useState, useEffect } from "react";
import * as userService from "../../services/users/users-service";
import {Link, useNavigate, useParams} from "react-router-dom";
import { profileThunk, logoutThunk } from "../../services/users/users-thunks";
import { useDispatch, useSelector } from "react-redux";

function AnonymousPublicProfile() {
    const { username } = useParams();
    const [profile, setProfile] = useState({});
    const dispatch = useDispatch();
    const {users} = useSelector((state) => state.users);
    const getProfile = async () => {
        const action = await dispatch(profileThunk());
        setProfile(action.payload);
    };
    const getUserByUsername = async () => {
        const user = await userService.findUserByUsername(username);
        setProfile(user);
    };

    useEffect(() => {
        if (username) {
            getUserByUsername().then(r => console.log("loaded"));
        } else {
            getProfile();
        }
    }, []);

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
                        <div className="wd-small-font wd-fg-color-lightgray">{profile.booksRead} Books
                            Read {`${(profile.role === "CRITIC" || profile.role === "AUTHOR") ? `| ${profile.comments.length} Reviews Posted` : ''}`} {`${(profile.role === "AUTHOR") ? `| ${profile.numBooksWritten} Books Written` : ''}`} </div>
                    </div>
                </div>
                <img src={`/images/books.jpeg`} width="100%" height={150} className="mt-2"/>
                <div className="row mt-5">
                    <div className="col-8">
                        <img src={profile.profilePicture} className="ms-4 wd-profile-img rounded-circle"/>
                    </div>
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
                                    console.log(f);
                                        const curr = users.find((u) => u._id === f);
                                        console.log(curr);
                                        // return (
                                        //     <li><Link to={`/readit/profile/${curr}`}>{curr.firstName} {curr.lastName}</Link>
                                        //     </li>
                                        // )
                                    }
                                )}

                            </ol>}
                    </div>
                </div>
                <div className="col-6 mt-4">
                    {profile.following &&
                        <h5>Followers ({profile.followers.length})</h5>}
                    {profile.following &&
                        <ol>
                            {profile.followers.map(f => {
                                    const curr = users.find((u) => u._id === f);
                                    console.log(curr)
                                    // return (
                                    //     <li><Link to={`/readit/profile/${curr}`}>{curr.firstName} {curr.lastName}</Link>
                                    //     </li>
                                    // )
                                }
                            )}
                        </ol>}
                </div>
            </div>
        );
    }
}

export default AnonymousPublicProfile;