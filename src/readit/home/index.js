import React,  {useState}  from "react";
import { useSelector } from "react-redux";
import TellYourStory from "./tell-your-story";
import PostsList from "../posts/posts-list";
import AnonymousHomePage from "./anonymous-homepage-view";

function HomeComponent() {

    const { currentUser } = useSelector((state) => state.users);
    console.log(currentUser);

    if (currentUser == null) {
        return <AnonymousHomePage/>
    }

    if (currentUser.role === "USER"){
        return(
                <div>
                    <h4>Home</h4>
                    <PostsList/>
                </div>
        );
    }

    else{
        return(
            <div>
                <h4>Home</h4>
                <TellYourStory/>
                <PostsList/>
            </div>
        );
    }
};
export default HomeComponent