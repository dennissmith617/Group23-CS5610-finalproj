import avatar from "./images/avatar_img.png";
import {Link} from "react-router-dom";

import axios from "axios";
import {getCommentsByBookId, updateComment} from "../../../services/comments/comments-service";
import {useState} from "react";
import {useDispatch} from "react-redux";
import comments from "./index";
import {
    deleteCommentThunk,
    findCommentsbyBookThunk,
    updateCommentsThunk
} from "../../../services/comments/comments-thunks";


const CommentItem = (props)=> {
    const {comment} = props;
    let [editing, setEditing] = useState(false);
    const [editReview, setEditReview] = useState();
    const [rating, setRating] = useState(comment.rating);
    const dispatch = useDispatch();
    const editClickHandler = (comment) => {
        setEditReview(comment)
        setEditing(true);
    }
    const saveClickHandler = () => {
        setEditing(false)
        dispatch(updateCommentsThunk(editReview));
        //to implement if update not working
        // setTimeout(()=>{
        //     dispatch(findCommentsbyBookThunk(comment.google_id))
        // }, 300)

    }
    console.log(editReview)
// TODO add current user using reducer below.
    let currentuser = "sjk126";
    const deleteButtonHandler = async (commentId) => {
        dispatch(deleteCommentThunk(commentId))
    }
    const date = new Date(comment.createdAt);
    let time = date.toTimeString().slice(0, 5);
    return (
        <li key={comment._id} className="list-group-item">
            <div className="row">
                <div className="col-2 text-center float-left">
                    <img style={{height:"80px", width:"80px"}} src={avatar} className="col-12 rounded-circle"/>
                    <div className="overflow-hidden"><a href={`/readit/profile/${comment.username}`}> {comment.username}</a></div>
                </div>
                <div className="col-10 float-left">
                    <div className="col-12" >
                        <div className="row">
                            <div className="col-7 float-left"><Link>{comment.bookTitle}</Link> </div>
                            {currentuser === comment.username &&
                                <div className="col-5 ">
                                    <button onClick={() => deleteButtonHandler(comment._id)}
                                            className="btn btn-danger float-end ms-1">Delete
                                    </button>
                                    {!editing &&
                                    <button onClick={()=>editClickHandler(comment)} className="btn btn-warning float-end ">Edit</button>
                                    }
                                    {editing &&
                                    <button onClick={saveClickHandler} className="btn btn-success float-end ">Save</button>}
                                </div>
                            }
                        </div>
                        <div className="row">
                        <div className="fw-bold float-left col-2">  Rating:</div>
                        {comment.rating < 1 &&
                            <div className="float-left col-6">
                                <i className="text-warning bi bi-star"></i>
                                <i className="text-warning bi bi-star"></i>
                                <i className=" text-warning bi bi-star"></i>
                                <i className="text-warning bi bi-star"></i>
                                <i className="text-warning bi bi-star"></i>

                            </div>}
                        {comment.rating<2 && comment.rating===1&&
                            <div className="float-left col-6">
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star"></i>
                                <i className=" text-warning bi bi-star"></i>
                                <i className="text-warning bi bi-star"></i>
                                <i className="text-warning bi bi-star"></i>

                            </div>}
                        {comment.rating<3 && comment.rating>=2 &&
                            <div className="float-left col-6">
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className=" text-warning bi bi-star"></i>
                                <i className="text-warning bi bi-star"></i>
                                <i className="text-warning bi bi-star"></i>

                            </div>}
                        {comment.rating<4 && comment.rating>=3&&
                            <div className="float-left col-6">
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className=" text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star"></i>
                                <i className="text-warning bi bi-star"></i>

                            </div>}
                        {comment.rating<5 && comment.rating>=4&&
                            <div className="float-left col-6">
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className=" text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star"></i>
                            </div>}
                        {comment.rating===5 &&
                            <div className className="float-left col-6">
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className=" text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star-fill"></i>
                                <i className="text-warning bi bi-star-fill"></i>
                                
                            </div>}

                        </div>
                    </div>
                    {editing &&
                        <textarea name="newReview" id="newReview" onChange={(e)=>{
                            setEditReview({
                                ...editReview,
                                comment: e.target.value
                            })
                        }} cols="30" rows="2"></textarea>}
                    {!editing &&
                    <div className= "col-12">
                        {comment.comment}
                    </div>}

                    {editing &&
                        <div className="col-12">
                            <label className="mt-1" htmlFor="rating"> Select Rating </label>
                        <select  onChange={(event) => setEditReview({
                            ...editReview
                            , rating: parseInt(event.target.value)
                        })
                        } id="rating" className="mt-1 ms-1">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select>
                            </div>}

                    { !editing && <div className="col-12  d-flex justify-content-end">{date.getMonth()}/{date.getDate()}/{date.getFullYear()} {time}
                    </div>}
                </div>

                </div>
                <div className="col-10 pl-0 float-left">
                    <i className="fa-star fa-solid"></i>
                </div>
        </li>)
}
export default CommentItem;