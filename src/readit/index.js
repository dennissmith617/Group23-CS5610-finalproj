import React from "react";
import NavigationSidebar from "./navigation-sidebar";
import {Routes, Route} from "react-router";
import HomeComponent from "./home";
import WhoToFollowList from "./who-to-follow-list";
import ProfileComponent from "./profile";
import EditProfileComponent from "./edit-profile";
import SearchComponent from "./search";
import LoginScreen from "./login";
import ProfilePublicComponent from "./profile/profile-public";
import RegisterScreen from "./register";
import {useSelector} from "react-redux";
import LogoutScreen from "./logout";

function Readit() {
    const { currentUser } = useSelector((state) => state.users);

    return (
        <div>
            <div className="row mt-2">
                <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                    <NavigationSidebar active="home"/>
                </div>
                <div className="col-10 col-md-10 col-lg-7 col-xl-6"
                     style={{"position": "relative"}}>
                    <Routes>
                        <Route path="home" element={<HomeComponent/>}/>
                        <Route path="profile/:lid/:vid" element={<ProfilePublicComponent/>}/>
                        <Route path="profile" element={<ProfileComponent/>}/>
                        <Route path="edit-profile" element={<EditProfileComponent/>}/>
                        <Route path="search" element={<SearchComponent/>}/>
                        <Route path="login" element={<LoginScreen/>}/>
                        <Route path="logout" element={<LogoutScreen/>}/>
                        <Route path="register" element={<RegisterScreen />}/>
                    </Routes>
                </div>
                <div className="d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
                     <WhoToFollowList/>
                </div>
            </div>
        </div>
    );
}

export default Readit