import avatar from "./images/avatar_img.png";
import {Link} from "react-router-dom";

import axios from "axios";
import {getCommentsByBookId} from "./comments-service.js";


const CommentItem = (props)=> {
    const {comment} = props;
    const deleteButtonHandler = async (commentId) => {
        await axios.delete(`http://localhost:4000/api/comments/${commentId}`)
        return commentId
    }
    const date = new Date(comment.createdAt);
    return (
        <li key={comment._id} className="list-group-item">
            <div className="row">
                <div className="col-2 text-center float-left">
                    <img style={{height:"80px", width:"80px"}} src={avatar} className="col-12 rounded-circle"/>
                    <div className="overflow-hidden"><Link >{comment.username}</Link></div>
                </div>
                <div className="col-10 float-left">
                    <div className="col-12" >
                        <div className="row">
                            <div className="col-7 float-left"><Link>{comment.bookTitle}</Link> </div>
                        <div className="col-5 ">
                            <button onClick={() => deleteButtonHandler(comment._id)} className="btn btn-danger float-end ms-1">Delete</button>
                            <button className="btn btn-warning float-end " >Edit</button>
                        </div>

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
                    <div className= "col-12">{comment.comment}</div>
                    <div className="col-12  d-flex justify-content-end">{date.getMonth()}/{date.getDate()}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</div>
                </div>

                </div>
                <div className="col-10 pl-0 float-left">
                    <i className="fa-star fa-solid"></i>
                </div>
        </li>)
}
export default CommentItem;