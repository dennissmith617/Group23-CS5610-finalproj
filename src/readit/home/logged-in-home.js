import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findCommentsbyUserThunk} from "../../services/comments/comments-thunks";
import CommentItem from "../details/comments/commentItem";


function LoggedInHomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const { currentUser } = useSelector((state) => state.users);
    console.log(currentUser);


    const getComments = async () => {
        const action = await dispatch(findCommentsbyUserThunk(currentUser.username));
        const arrayToShot = [...action.payload];
        if(arrayToShot) {
            setComments(arrayToShot.sort((a,b)=> a.timestamps - b.timestamps).reverse().slice(0,3));
        }
    };

    useEffect(() =>{
        getComments().then(r => console.log("all comments loaded"));


    },[]);
    const search = () => {
        try {
            navigate("/readit/search");
        } catch (err) {
            console.log(err);
        }
    };

    console.log(comments);

    return(
        <div>
            <h1 className="gbook-page-title">Home</h1>
            <img src="/images/books.jpeg" className="w-100" alt="book header"/>
            <h2>Your Recent Reviews</h2>

            {comments.map(comment => <CommentItem comment = {comment} canEdit={true}/>)
            }

            <h2>Want to find some more books to read? </h2>

            <button onClick={search} className="btn btn-primary">
                Search for books here!
            </button>
        </div>
    );
}
export default LoggedInHomePage;