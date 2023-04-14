import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PostItem from "./post-item";
import {findPostsThunk} from "../../services/posts/post-thunk";

const PostsList = () => {
 const {posts, loading} = useSelector(
  state => state.postsData)
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(findPostsThunk())
 }, [])
    return(
        <ul className="list-group mb-3">
             {
               loading &&
               <li className="list-group-item">
                 Loading...
               </li>
             }

            {
                posts.map(post =>
                    <PostItem
                        key={post.id} post={post}/> )
            }
        </ul>
    );
};
export default PostsList;