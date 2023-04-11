import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {logoutThunk} from "../../services/users/users-thunks";

function LogoutScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        try {
            dispatch(logoutThunk());
            navigate("/readit/home");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <button onClick={logout} className="btn btn-primary">
                Confirm Logout
            </button>
        </div>

    );
}

export default LogoutScreen;