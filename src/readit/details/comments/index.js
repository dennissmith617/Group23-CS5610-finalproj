import {useParams} from "react-router";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {findALlCommentsThunk, findCommentsbyBookThunk} from "../../../services/comments/comments-thunks";
import {
    getBookDescription,
    getBook,
} from "../service/details-service";
import {

    getReaditBookRating
} from "../../../services/comments/comments-service";
import CommentItem from "../comments/commentItem.js";
import {bookRead, bookReadStatus, bookUnread} from "../../../services/users/users-service";
import {findAllUsersThunk} from "../../../services/users/users-thunks";

function Details(
    {currentUser1 = { "_id": "6428cfd6dfee68f431eb57d1", "role": "AUTHOR", "username": "test_2", "email": "test@test.com",
    "firstName": "Dummy", "lastName": "User", "age": 30,
    "profilePicture": "../../images/defaultProPic.jpeg",
    "followers": [1, 2, 3], "following": [1, 2, 3, 4, 5], "comments": ["c1", "c2"], "booksRead": 6789, "numBooksWritten": 45
}}) {

    let state = useSelector((state) => state.users);
    let {currentUser} = useSelector((state) => state.users);
    currentUser = state.users.find((u) => u._id === state.currentUser._id);


    let bookImageLoading = false;
    const {id} = useParams()
    const [book, setBook] =useState();
    const [bookName, setBookName] =useState();
    const [googleRating, setGoogleRating] =useState(0);
    const [bookImage, setBookImage] =useState();
    const [bookReleaseDate, setBookReleaseDate] =useState();
    const [bookAuthors, setBookAuthors] =useState([]);
    const [bookDescription, setBookDescription] =useState();
    const [bookPreview, setBookPreview] =useState();
    const [pageCount, setPageCount] = useState();
    const [previouslyRead, setPreviouslyRead] = useState();
    const [commentsArray, setCommentsArray] = useState([]);
    const [rating, setRating] = useState(1);
    const [readitRating, setReaditRating] = useState(0);
    const [ISBN, setISBN] = useState();
    const [comment, setComment] =useState("");
    const {comments, loading} = useSelector(
        state => state.commentsData)
    const [commentStatus, setCommentStatus] =useState();
    const dispatch = useDispatch();

    const commentsClickHandler = async () => {
        console.log(currentUser);
        const newComment = {
            comment : comment,
            // using params below will update for state once fixed.
            username: currentUser.username,
            userId: currentUser._id,
            rating: rating,
            google_id:id,
            bookTitle: bookName
        }
        const {data}  = await axios.post('http://localhost:4000/api/comments',{comment:newComment})
        console.log(data)
        dispatch(findCommentsbyBookThunk(id));
        setComment("")

    };
    const readClickHandler = async () => {
        bookRead(currentUser._id,id,bookName);
        setPreviouslyRead(true)
    }
    const unreadClickHandler = async () => {
        bookUnread(currentUser._id,id,bookName);
        setPreviouslyRead(false)
    }
    const fetchBookReadStatus = async ()=>{
        const response = await bookReadStatus(currentUser._id, id);
        console.log(currentUser._id)
        console.log(id)
        console.log(response)
        setPreviouslyRead(response.data);
    }

    const fetchReaditBookRating = async () =>{
        const response = await getReaditBookRating(id);
        const responseFloat = parseFloat(response[0].bookRating);
        const readitInt = parseInt(responseFloat);
        setReaditRating(readitInt)
    }
    const fetchCommentStatus = async () =>{
        if(currentUser.role==="AUTHOR" || currentUser.role==="CRITIC"){
            setCommentStatus(true)}
        }
    const fetchBook = async () =>{
        const response =await getBook(id);
        setBook(response)
        setBookImage(response.volumeInfo.imageLinks.small)
        setGoogleRating(response.volumeInfo.averageRating)
        setBookAuthors(response.volumeInfo.authors)
        setBookReleaseDate(response.volumeInfo.publishedDate)
        setBookPreview(response.volumeInfo.previewLink)
        setPageCount(response.volumeInfo.pageCount)
        setISBN(response.volumeInfo.industryIdentifiers[1].identifier)
        setBookName(response.volumeInfo.title)


    };

        const fetchBookDescription= async () => {
            const response = await getBookDescription(id);
            const sanitizedHtml = DOMPurify.sanitize(response);
            setBookDescription(sanitizedHtml)
    }

    useEffect(() =>{
        dispatch(findAllUsersThunk());
        fetchBook()
        fetchBookDescription()


        try {
            fetchReaditBookRating()
        }catch(err) {console.log(err)}


    },[]);
    useEffect(() =>{
        dispatch(findCommentsbyBookThunk(id));

    },[]);

    if(previouslyRead===undefined){
    fetchBookReadStatus()}
    if(commentStatus===undefined){
        fetchCommentStatus()
    }
    console.log(previouslyRead)
    return (
        <>
        <div>
            <div className="row" >
                <div className="col-3  float-left">
                    <div className="card sticky-top" >
                        {bookImage? <img className="card-img-top w-100" src={bookImage} alt="Card image cap"/>:
                            <div className="text-center">< div className="spinner-border  " role="status">
                            <span className="sr-only"></span>
                            </div>
                            </div>}
                            <div className="card-body">
                                <h5 className="card-title"> </h5>
                                <h6 className="text-sm-center text-decoration-underline">Authored By:</h6>
                                <p className="card-text">{bookAuthors?.map((author) => (
                                    <h6 className="text-sm-center">{author}</h6>))} </p>
                                <hr/>
                                <div>
                                    {}
                                    <h6 className="text-sm-center">{bookReleaseDate}</h6>
                                </div>
                                {googleRating<1 &&
                                <div className="text-sm-center">
                                    <i className="text-warning bi bi-star"></i>
                                    <i className="text-warning bi bi-star"></i>
                                    <i className=" text-warning bi bi-star"></i>
                                    <i className="text-warning bi bi-star"></i>
                                    <i className="text-warning bi bi-star"></i>
                                    <span className="fw-semibold"><br/><i className="bi bi-google"></i> Rating: ({googleRating})</span>
                                </div>}
                                {googleRating<2 && googleRating>=1&&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className=" text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <span className="fw-semibold"><br/><i className="bi bi-google"></i> Rating: ({googleRating})</span>
                                    </div>}
                                {googleRating<3 && googleRating>=2&&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className=" text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <span className="fw-semibold"><br/><i className="bi bi-google"></i> Rating: ({googleRating})</span>
                                    </div>}
                                {googleRating<4 && googleRating>=3&&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className=" text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                         <span className="fw-semibold"><br/><i className="bi bi-google"></i> Rating: ({googleRating})</span>
                                    </div>}
                                {googleRating<5 && googleRating>=4&&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className=" text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <span className="fw-semibold"><br/><i className="bi bi-google"></i> Rating: ({googleRating})</span>
                                    </div>}
                                {googleRating===5 &&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className=" text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <span className="fw-semibold"><br/><i className="bi bi-google"></i> Rating: ({googleRating})</span>
                                    </div>}
                                {readitRating<1 &&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className=" text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <span className="fw-semibold"><br/>Readit Rating: ({readitRating})</span>
                                    </div>}
                                {readitRating<2 && readitRating>=1&&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className=" text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <span className="fw-semibold"><br/>Readit Rating: ({readitRating})</span>
                                    </div>}
                                {readitRating<3 && readitRating>=2&&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className=" text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <span className="fw-semibold"><br/>Readit Rating: ({readitRating})</span>
                                    </div>}
                                {readitRating<4 && readitRating>=3&&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className=" text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <span className="fw-semibold"><br/>Readit Rating: ({readitRating})</span>
                                    </div>}
                                {readitRating<5 && readitRating>=4&&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className=" text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star"></i>
                                        <span className="fw-semibold"><br/>Readit Rating: ({readitRating})</span></div>}
                                {readitRating===5 &&
                                    <div className="text-sm-center">
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className=" text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <i className="text-warning bi bi-star-fill"></i>
                                        <span className="fw-semibold"><br/>Readit Rating: ({readitRating})</span></div>}
                                <div className="text-sm-center">

                                    {bookPreview?<a target="_blank" href={bookPreview}><button className="btn btn-primary">Google Books</button></a>:
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status"
                                                  aria-hidden="true"></span>
                                            Loading...
                                        </button>}
                                </div>

                                    <div className="text-sm-center">
                                        {!previouslyRead&&
                                        <button onClick={()=> readClickHandler()} className="btn btn-success mt-1">Read</button>}

                                    </div>
                                        <div className="text-sm-center">
                                            {previouslyRead &&
                                                <button onClick={() => unreadClickHandler()}
                                                        className="btn btn-danger mt-1">Unread</button>}
                                    </div>
                            </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="col-12 text-lg-center">

                        <h1 className="font-weight-bold fw-semibold " style={{fontFamily:"Courier New"}}> {bookName} </h1>
                        <hr/>
                    </div>
                    <div className="row">
                        <div className="col-12">


                            <div className="col-6 float-left">

                            </div>


                        </div>
                        <div className="col-12">
                            <div>
                                {bookDescription?
                                    <div> <div dangerouslySetInnerHTML={{ __html: bookDescription }}></div>
                                        <hr/>
                                        <div><p className="text-muted ">Pages: {pageCount}</p></div>
                                        <div><p className="text-muted  ">ISBN: {ISBN}</p></div>
                                    </div> :<div className="text-center">< div className="spinner-border" role="status">
                                    <span className="sr-only"></span>
                                    </div>
                                    </div>}
                            </div>
                        </div>

                        <div className="col-12">

                            <hr/>

                            <h2>Ratings & Reviews</h2>

                            <div className="row">
                                {currentUser && commentStatus &&
                                      <div className="col-12">
                                    { <textarea value={comment} placeholder="Leave Review"
                                         className="form-control border-1 rounded"
                                         onChange={(event) => setComment(event.target.value)}>
                               </textarea>}
                                    <div>
                                        <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                                                onClick={commentsClickHandler}>
                                            Post
                                        </button>
                                        <label className="mt-1" htmlFor="rating"> Select Rating </label>
                                        <select  onChange={(event)=> setRating(parseInt(event.target.value))} id="rating" className="mt-1 ms-1">
                                           <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <hr/>
                                </div>}
                                <div className="row">
                                    <ul className="list-group">
                                        {comments?.map(comment => <CommentItem comment = {comment} canEdit={true}/>)}
                                    </ul>

                                </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
            </div>

        </>

        );
}
export default Details;