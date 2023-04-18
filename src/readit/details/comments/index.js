import {useParams} from "react-router";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {findCommentsbyBookThunk} from "../../../services/comments/comments-thunks";
import {
    getBookTitle,
    getBookImage,
    getAuthorNames,
    getBookDescription,
    getBookReleaseDate,
    getBook,
    getBookPreview,
    getGoogleRating,
    getPageCount,
    getISBN
} from "../service/details-service";
import {getCommentsByBookId, getCommentsByUserId} from "../../../services/comments/comments-service";
import CommentItem from "../comments/commentItem.js";

function Details(
    {currentUser1 = { "_id": "6428cfd6dfee68f431eb57d1", "role": "AUTHOR", "username": "test_2", "email": "test@test.com",
    "firstName": "Dummy", "lastName": "User", "age": 30,
    "profilePicture": "../../images/defaultProPic.jpeg",
    "followers": [1, 2, 3], "following": [1, 2, 3, 4, 5], "comments": ["c1", "c2"], "booksRead": 6789, "numBooksWritten": 45
}}) {

    // let state = useSelector((state) => state.users);
    // let {currentUser} = useSelector((state) => state.users);
    // try {
    //     currentUser = state.users.find((u) => u._id === state.currentUser._id);
    // } catch(error) {
    //     console.log(error);
    // }
    // let userid = currentUser._id
    let userid = currentUser1.username;
    let bookImageLoading = false;
    const {username,id} = useParams()
    const [book, setBook] =useState();
    const [bookName, setBookName] =useState();
    const [googleRating, setGoogleRating] =useState(0);
    const [bookImage, setBookImage] =useState();
    const [bookReleaseDate, setBookReleaseDate] =useState();
    const [bookAuthors, setBookAuthors] =useState([]);
    const [bookDescription, setBookDescription] =useState();
    const [bookPreview, setBookPreview] =useState();
    const [pageCount, setPageCount] = useState();
    const [commentsArray, setCommentsArray] = useState([]);
    const [rating, setRating] = useState(1);
    const [ISBN, setISBN] = useState();
    const [comment, setComment] =useState("");
    const {comments, loading} = useSelector(
        state => state.commentsData)
    const dispatch = useDispatch();

    const commentsClickHandler = async () => {
        const newComment = {
            comment : comment,
            // using params below will update for state once fixed.
            username: username,
            rating: rating,
            google_id :id,
            bookTitle: bookName
        }
        const {data}  = await axios.post('http://localhost:4000/api/comments',{comment:newComment})
        console.log(data)
        dispatch(findCommentsbyBookThunk("sFX0AwAAQBAJ"));
        setComment("")

    };
    const readClickHandler = async (user_id) => {
        await axios.put(`http://localhost:4000/api/users/increaseBooksRead/${user_id}`)
        console.log(user_id);
    }
    const unreadClickHandler = async (user_id) => {
        await axios.put(`http://localhost:4000/api/users/decreaseBooksRead/${user_id}`)
        console.log(user_id);
    }

    const fetchCommentsByBookId= async (id) => {
        const response = await getCommentsByBookId(id);
        console.log(response);
        setCommentsArray(response.reverse());
    }

    // const fetchBookName = async () =>{
    //     const response =await getBookTitle(id);
    //     setBookName(response)
    //
    // };
    // const fetchGoogleRating = async () =>{
    //     const response =await getGoogleRating(id);
    //     const ratingInt = parseFloat(response);
    //     setGoogleRating(ratingInt)
    // };
    // const fetchBookPreview = async () =>{
    //     const response =await getBookPreview(id);
    //     setBookPreview(response)
    // };
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
    // const fetchBookImage = async () =>{
    //     const response =await getBookImage(id);
    //     bookImageLoading = true;
    //   //  setBookImage(response)
    // };
    // const fetchBookAuthors = async () => {
    //     const response = await getAuthorNames(id);
    //     setBookAuthors(response)
    // }
        const fetchBookDescription= async () => {
            const response = await getBookDescription(id);
            const sanitizedHtml = DOMPurify.sanitize(response);
            console.log(sanitizedHtml)
            setBookDescription(sanitizedHtml)
    }
    // const fetchBookReleaseDate= async () => {
    //     const response = await getBookReleaseDate(id);
    //     setBookReleaseDate(response)
    // }
    // const fetchPageCount= async () => {
    //     const response = await getPageCount(id);
    //     setPageCount(response)
    // }
    // const fetchISBN= async () => {
    //     const response = await getISBN(id);
    //     setISBN(response[1].identifier)
    // }
    useEffect(() =>{
       //  fetchBookName();
       // fetchBookImage()
       // fetchBookAuthors()
        fetchBookDescription()
        //fetchBookReleaseDate()
        fetchBook()
        // fetchBookPreview()
       // fetchGoogleRating()
       //  fetchPageCount()
       //  fetchISBN()
        // fetchCommentsByBookId(id)
    },[]);
    useEffect(() =>{
        dispatch(findCommentsbyBookThunk(id));


    },[]);


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
                                <p className="card-text">{bookAuthors.map((author) => (
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
                                <div className="text-sm-center">

                                    {bookPreview?<a target="_blank" href={bookPreview}><button className="btn btn-primary">Google Books</button></a>:
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status"
                                                  aria-hidden="true"></span>
                                            Loading...
                                        </button>}
                                </div>

                                    <div className="text-sm-center">

                                        <button onClick={()=> readClickHandler(currentUser1._id)} className="btn btn-success mt-1">Read</button>
                                    </div>
                                        <div className="text-sm-center">
                                            <button onClick={()=> unreadClickHandler(currentUser1._id)} className="btn btn-danger mt-1">Unread</button>

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
                                <div className="col-12">
                                    {  <textarea value={comment} placeholder="Leave Review"
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
                                </div>
                                <div className="row">
                                    <ul className="list-group">

                                        {comments.map(comment => <CommentItem comment = {comment} canEdit={true}/>)}
                                    </ul>

                                </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
            <pre>
                                    {JSON.stringify(bookName,null,2)}
                                </pre>
            <pre>
                                    {JSON.stringify(bookImage,null,2)}
                                </pre>
            <pre>
                                    {JSON.stringify(bookAuthors,null,2)}
                                </pre>
            <pre>
                                    {JSON.stringify(bookDescription,null,2)}
                                </pre>

            <pre>
                                    {JSON.stringify(book,null,2)}
                                </pre>
            </div>

        </>

        );
}
export default Details;