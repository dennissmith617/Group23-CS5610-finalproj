import React, {useState} from "react";
import {createPostThunk} from "../../services/posts/post-thunk";
import {useDispatch} from "react-redux";

const TellYourStory = () => {
    let [tellYourStory, setTellYourStory] = useState('');
    const dispatch = useDispatch();
    const postClickHandler = () => {
        const newPost = {
            post: tellYourStory
        }
        dispatch(createPostThunk(newPost));
    }

    return (

        <div className="row">
            <div className="col-auto">
                <img src="/images/GRRM_profile.jpeg" width={60}/>
            </div>
            <div className="col-10">
       <textarea value={tellYourStory} placeholder="Tell Your Story"
                 className="form-control border-0"
                 onChange={(event) => setTellYourStory(event.target.value)}>
       </textarea>
                <div>
                    <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                            onClick={postClickHandler}>
                        Post
                    </button>
                    <div className="text-primary fs-2">
                        <i className="bi bi-card-image me-3"></i>
                        <i className="bi bi-filetype-gif me-3"></i>
                        <i className="bi bi-bar-chart me-3"></i>
                        <i className="bi bi-emoji-smile me-3"></i>
                        <i className="bi bi-geo-alt"></i>
                    </div>
                </div>
            </div>
            <div className="col-12"><hr/></div>
        </div>
    );
}
export default TellYourStory;