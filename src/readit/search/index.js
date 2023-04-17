import React from "react";
import GbookScreen from "../gbooks";

const SearchComponent = () => {
    return(
        <>
             <div className="row">
               <div className="col-11 position-relative">
                 <input placeholder="Search Readit"
                        className="form-control rounded-pill ps-5"/>
                 <i className="bi bi-search position-absolute wd-nudge-up"></i>
               </div>
               <div className="col-1">
                 <i className="wd-bottom-4 text-primary float-end bi
                               bi-gear-fill fs-2 position-relative"></i>
               </div>
                <GbookScreen/>
             </div>
           </>

    );
};
export default SearchComponent ;