import React from "react";
import {useSelector} from "react-redux";
import WhoToFollowListItem
  from "./who-to-follow-list-item";

const WhoToFollowList = () => {
 return(
   <ul className="list-group">
     <li className="list-group-item">
       <h3>Who to follow</h3>
     </li>
     <WhoToFollowListItem/>
   </ul>
 );
};

export default WhoToFollowList;