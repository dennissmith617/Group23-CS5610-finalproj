import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../../services/users/users-thunks";

function RegisterScreen() {
    const { currentUser } = useSelector((state) => state.users);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [role, setRole] = useState("VIEWER");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const register = () => {
        try {
            dispatch(registerThunk({ username, password, firstName, lastName, email, age, role}));
            navigate("/readit/profile");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <h1>Register</h1>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    placeholder="username"
                />
            </div>
            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    placeholder="first name"
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    placeholder="last name"
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="email"
                />
            </div>
            <div className="form-group">
                <label>Age</label>
                <input
                    type="number"
                    className="form-control"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                    }}
                    placeholder="age"
                />
            </div>
            <div className="form-group">
                <label>Role</label>
                <select id={role} defaultValue="VIEWER">
                    <option value="VIEWER">Viewer</option>
                    <option value="AUTHOR">Author</option>
                    <option value="CRITIC">Critic</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
            </div>
            <div className="form-group">
                <label>Password Validation</label>
                <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    placeholder="confirm passwords"
                />
            </div>
            <button onClick={register} className="btn btn-primary">
                Register
            </button>
            <div>
                {currentUser && (
                    <div>
                        <h2>{currentUser.username}</h2>
                        <h2>{currentUser.password}</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegisterScreen;