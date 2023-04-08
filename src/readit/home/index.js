import React,  {useState}  from "react";
import { useSelector } from "react-redux";
import TellYourStory from "./tell-your-story";
import PostsList from "../posts/posts-list";

function HomeComponent() {

    const { currentUser } = useSelector((state) => state.users);
    console.log(currentUser);

    if (currentUser == null) {
        return <div/>
        // render custom stand home street
    }

    if (currentUser.role == "USER"){
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