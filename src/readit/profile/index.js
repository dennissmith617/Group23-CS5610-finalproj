import React from "react";
import {Link} from "react-router-dom";

const ProfileComponent = (

) => {

    return (
        <>
            <div className="position-relative">
                <div className="row">
                    <i className="col col-2 bi bi-arrow-left fs-4 fw-bold mt-2"></i>
                    <div className="col "><span className="fs-4 fw-bold">Dennis Smith</span>
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
                <div className="fs-4 fw-bold">Dennis Smith</div>
                <div className="text-secondary">@fakedata</div>
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
        </>
    );
}

export default ProfileComponent;