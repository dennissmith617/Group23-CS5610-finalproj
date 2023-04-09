import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {profileThunk} from "../../services/users/users-thunks";

function ProfileComponent() {

    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();
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
                    <i className="col col-2 bi bi-book fs-4 fw-bold mt-2"></i>
                    <div className="col "><span className="fs-4 fw-bold">Hello {currentUser.firstName}!</span>
                        <div className="text-secondary">{currentUser.booksRead} Books Read</div>
                    </div>
                </div>
                <img src={`/images/books.jpeg`} width="100%" height={150}  alt="book_banner"/>
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
                <div className="fs-4 fw-bold">{currentUser.firstName} {currentUser.lastName}</div>
                <div className="text-secondary">{currentUser.username}</div>
                <div className="text-secondary mt-3">
                    <i className="bi bi-balloon ps-2"></i><span>{currentUser.age} Years Old</span>
                </div>
                <div className="mt-3">
                    <span className="fw-bold">100</span> <span className="text-secondary">Following</span>
                    <span className="fw-bold ps-2">100</span> <span className="text-secondary">Followers</span>
                </div>
            </div>
        </>);
}

export default ProfileComponent;