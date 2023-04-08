import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { profileThunk, updateUserThunk } from '../../services/users/users-thunks';


const EditProfileComponent = (
    {profile1 = { "_id": 1, "role": "CRITIC", "username": "dummy", "email": "test@test.com",
    "firstName": "Dummy", "lastName": "User", "age": 30,
    "profilePicture": "../../images/defaultProPic.jpeg",
    "followers": [1, 2, 3], "following": [1, 2, 3, 4, 5], "comments": ["c1", "c2"], "booksRead": 6789, "numBooksWritten": 45
  }}
) => {
    let state = useSelector((state) => state.users);
    let currentUser = state.users.find((u) => u._id === state.currentUser._id);
    let [prof, setProfile] = useState({...currentUser, "role":currentUser.role, "email":currentUser.email, "age":currentUser.age, "firstName":currentUser.firstName, "lastName": currentUser.lastName, "booksRead": currentUser.booksRead, "username": currentUser.username});
    const dispatch = useDispatch();
    const profileSaveHandler = () => {
        try {
            dispatch(updateUserThunk(prof));
        } catch (error) {
            console.log(error);
        }
        
    }
    return(
        <div>
            <div className="row">
                <div className="col-1">
                <Link to="/readit/profile">
                    <i className="bi bi-x-lg float-end"></i>
                </Link>
                </div>
                <div className="col-9">
                    <b className="fs-4">Edit Profile</b>
                </div>
                <div className="col-2">
                    <Link to="/readit/profile">
                        <button onClick={profileSaveHandler} className="rounded-pill btn btn-dark float-end pe-3 ps-3 mb-2 fw-bold">Save</button>
                    </Link>
                    
                </div>
            </div>
            {/* <img src={currentUser.bannerPicture} className="w-100"/> */}
            {/* <div className="row">
                <div className="col-8">
                    <img src={currentUser.profilePicture} className="wd-edit-profile-img rounded-circle"/>
                </div>
            </div> */}
            <div className="wd-move-up mb-2">
                {/* <form className="form-floating"> */}
                <div>
                    <label className="wd-fg-color-lightgray" htmlFor="floatingInputValue">Type</label><br/>
                    <select onChange={(event) => setProfile({...prof, "role":event.target.value})} defaultValue={currentUser.role}>
                        <option value="VIEWER">Viewer</option>
                        <option value="CRITIC">Critic</option>
                        <option value="AUTHOR">Author</option>
                    </select>
                </div>
                {/* </form> */}
                <form className="form-floating mt-4">
                    <input type="text" className="form-control" onChange={(event) => setProfile({...prof, "firstName":event.target.value.split(" ")[0], "lastName": event.target.value.split(" ")[1]})} defaultValue={`${currentUser.firstName} ${currentUser.lastName}`} />
                    <label htmlFor="floatingInputValue">Name</label>
                </form>
                <form className="form-floating mt-4">
                    <input type="text" className="form-control" onChange={(event) => setProfile({...prof, "email":event.target.value})} defaultValue={currentUser.email}/>
                    <label htmlFor="floatingInputValue">Email</label>
                </form>
                <form className="form-floating mt-4">
                    <input type="text" className="form-control" onChange={(event) => setProfile({...prof, "username":event.target.value})} defaultValue={currentUser.username}/>
                    <label htmlFor="floatingInputValue">Username</label>
                </form>
                <form className="form-floating mt-4">
                    <input type="number" className="form-control" onChange={(event) => setProfile({...prof, "booksRead":event.target.value})} defaultValue={currentUser.booksRead}/>
                    <label htmlFor="floatingInputValue">Number of Books Read</label>
                </form>
                <form className="form-floating mt-4">
                    <input type="number" className="form-control" onChange={(event) => setProfile({...prof, "age":event.target.value})} defaultValue={currentUser.age}/>
                    <label htmlFor="floatingInputValue">Age</label>
                </form>
                <form className="form-floating mt-4" hidden={`${(prof.role === "AUTHOR") ? '' : 'hidden'}`}>
                    <input type="number" className="form-control" onChange={(event) => setProfile({...prof, "numBooksWritten":event.target.value})} defaultValue={`${(currentUser.numBooksWritten) ? (currentUser.numBooksWritten) : 0 }`}/>
                    <label htmlFor="floatingInputValue">Number of Books Written</label>
                </form>
            </div>
        </div>
    );
};
export default EditProfileComponent;