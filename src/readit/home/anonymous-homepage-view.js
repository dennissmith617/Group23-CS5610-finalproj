import React, {useEffect, useState} from "react";
import {findALlCommentsThunk} from "../../services/comments/comments-thunks";
import {useDispatch} from "react-redux";
import CommentItem from "../details/comments/commentItem";

function AnonymousHomePage() {

    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();

    const getAllComments = async () => {
        const action = await dispatch(findALlCommentsThunk());
        setComments(action.payload.sort((a,b)=> a.timestamps - b.timestamps).reverse().slice(0,3));
    };
    useEffect(() => {
        getAllComments().then(r => console.log("all comments loaded"));

    }, []);

   return (
       <div className="position-relative mb-2">
           <img src="/images/books.jpeg" className="w-100" alt="book header"/>
           <h1 className="gbook-page-title">Welcome to Readit!</h1>
           <h2>Trying to decide your next read?</h2>
           <paragraph>Look no further than Readit! When you sign up, you can connect with friends and find new books.</paragraph>

           <h2>Latest Reviews from Our Users</h2>

           {comments.map(comment => <CommentItem comment = {comment} canEdit={false}/>)
           }

       </div>
    )
}
export default AnonymousHomePage;