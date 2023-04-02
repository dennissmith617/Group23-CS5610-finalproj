import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {profileThunk} from "../../services/users/users-thunks";

function ProfileComponent() {

    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(currentUser);
    useEffect(() => {
        dispatch(profileThunk());
    }, []);

    if (!currentUser) {
        return (<div>Sorry you are not logged in! Create an account to view this page.</div>);
    }


    return (
        <>
            <div className="position-relative">
                <div className="row">
                    <i className="col col-2 bi bi-arrow-left fs-4 fw-bold mt-2"></i>
                    <div className="col "><span className="fs-4 fw-bold">Hello!</span>
                        <div className="text-secondary">100 Books Read</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col ">
                        <br/>
                        <Link to="/readit/edit-profile" className="clearfix">
                            <button className="btn btn-light fw-bold rounded-pill float-end mt-3">
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <div className="fs-4 fw-bold">{currentUser.username} fix add </div>
                <div className="text-secondary">{currentUser.username}</div>
                <div>add data</div>
                <div className="text-secondary mt-3">
                    <i className="bi bi-geo-alt"></i><span>Fake Location</span>
                    <i className="bi bi-balloon ps-2"></i><span>Born Fake Date</span>
                    <i className="bi bi-calendar3 ps-2"></i><span>Joined  Fake data</span>
                </div>
                <div className="mt-3">
                    <span className="fw-bold">100</span> <span className="text-secondary">Following</span>
                    <span className="fw-bold ps-2">100</span> <span className="text-secondary">Followers</span>
                </div>
            </div>
        </>);
}

export default ProfileComponent;