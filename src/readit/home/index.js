import React from "react";
import { useSelector} from "react-redux";
import AnonymousHomePage from "./anonymous-homepage-view";
import {useNavigate} from "react-router-dom";
import LoggedInHomePage from "./logged-in-home";

function HomeComponent() {
    const { currentUser } = useSelector((state) => state.users);
    console.log(currentUser);


    if (currentUser == null) {
        return <AnonymousHomePage/>
    }

    return(
        <LoggedInHomePage/>
    );
}
export default HomeComponent