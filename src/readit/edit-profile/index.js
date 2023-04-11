import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

const EditProfileComponent = () => {
    const [firstName, setFirstName] = useState({firstName: "Dennis"});
    const [lastName, setLastName] = useState({lastName: "Smith"});
    const [bio, setBio] = useState({bio: "Fake"});
    const [location, setLocation] = useState({location: "Fake, MA"});
    const [website, setWebsite] = useState({website: "www.fake.com"});
    const [dateOfBirth, setDateOfBirth] = useState({dateOfBirth:"10-11-2022"});

    return (
        <>
            <div className="position-relative">
                <div className="row  mb-2">
                    <a className="col col-2 mt-2" href="/readit/profile"><i className="bi bi-x-lg fs-4 fw-bold"></i></a>
                    <div className="col col-8 mt-2"><span className="fs-4 fw-bold">Edit Profile</span></div>
                    <button className="col col-2 btn btn-dark float-end fw-bold rounded-pill"
                            onClick={() => console.log("clicked")}>
                        Save</button>
                </div>

                    <div className="col col-8">
                    <div className="col col-4 mb-6"><br/></div>
                </div>
            </div>
            <div className="mt-3 form-group">
               <label htmlFor="firstname">First Name</label><br/>
               <input type="text" id="firstname" className="form-control"
                      onChange={(e)=>{setFirstName({firstName: e.target.value})}}
                      value={firstName.firstName}/><br/>

               <label htmlFor="lastname">Last Name</label><br/>
               <input type="text" id="lastname" className="form-control"
                      onChange={(e)=>{setLastName({lastName: e.target.value})}}
                      value={lastName.lastName}/><br/>

               <label htmlFor="inputBio">Bio</label><br/>
               <input type="text" className="form-control"
                         onChange={(e)=>{setBio({bio: e.target.value})}}
                         value={bio.bio} id="inputBio"/><br/>

               <label htmlFor="inputLocation">Location</label><br/>
               <input type="text" id="inputLocation" className="form-control"
                      onChange={(e)=>{setLocation({location: e.target.value})}}
                      value={location.location}/><br/>

               <label htmlFor="inputWebsite">Website</label><br/>
               <input type="text" id="inputWebsite" className="form-control"
                      onChange={(e)=>{setWebsite({website: e.target.value})}}
                      value={website.website}/><br/>

               <label htmlFor="inputDOB">Date of Birth</label><br/>
               <input type="date" id="inputDOB" className="form-control"
                      onChange={(e)=>{setDateOfBirth({dateOfBirth: e.target.value})}}
                      value={dateOfBirth.dateOfBirth}/>
           </div>
        </>
    )
}

export default EditProfileComponent;