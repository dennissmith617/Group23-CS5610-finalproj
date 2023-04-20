import { useEffect, useState } from "react";
import { fullTextSearch } from "./gbook-service";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";

function GbookSearchScreen(){
    const {searchterm} = useParams();
    const [search, setSearch]=useState(searchterm);
    const [results, setResults]=useState({});
    const [error, setError]=useState(null);

    const navigate = useNavigate();
    const searchBook = async () => {
        try{
        const response = await fullTextSearch(search);
        //console.log(results);
        setResults(response);
        setError(null);
        }catch(e){
            setError(e);
            setResults({});
        }
        navigate(`/readit/search/${search}`)
    }
    useEffect( ()=>{
        if(searchterm){
            searchBook();
        }
    },[searchterm]
    
    )
    
    const searchBookCriteria = async (search) => {
        setSearch(search);
        const response = await fullTextSearch(search);
        setResults(response);
        navigate(`/readit/search/${search}`)
    }

    return (
        <div className="gbook-serach">
            <h1 className="gbook-page-title">Book Search</h1>
            <div className="row">
               <div className="col-9 position-relative">
                 <input type="text" placeholder="Search Readit"
                    value={search} 
                    onChange={(e) =>setSearch(e.target.value)}
                    className="form-control rounded-pill ps-5"/>
                    <i class="bi bi-book position-absolute wd-nudge-up gbook-search-icon"></i>
               </div>
               
               <div className="col-3">
                    <button className="btn btn-primary rounded-pill btn-sm search-button" onClick={searchBook}>
                            Search
                    </button>
               </div>
             </div>
             <div>
                {error && <h1 className="text-center">Something went wrong{error?.message}</h1>}
             </div>

            {results.items && <h2>Books</h2>}      
            <div >    
                    <ul className="list-group">
                            {
                              results.items && results.items.map((book)=>{
                                var image_source="";
                                    try{
                                        image_source = book.volumeInfo.imageLinks.thumbnail
                                    }catch{
                                        console.log("error reading thumbnail")
                                    }
                                return(
                                    <li className="list-group-item">
                                        <div className="gbook-item-color">
                                            <div className="row">
                                                    <div className="col-3">
                                                        <img src={image_source} alt="book image" className="gbook-image"/>
                                                    </div>
                                                    
                                                    <div className="col-6">  
                                                        <p className="gbook-title">Title:{book?.volumeInfo?.title}</p>
                                                        <p className="gbook-author">Author:{book?.volumeInfo?.authors}</p>
                                                        <p className="gbook-publisher">Publish Date:{book?.volumeInfo?.publishedDate}</p>
                                                    </div>
                                                    <div className="col-3">
                                                       
                                                            <Link to={`/readit/details/${book?.id}`}> 
                                                                    <button className="btn btn-info btn-sm detailed-search-button float-end">
                                                                        Details
                                                                    </button>
                                                            </Link>
                                                       
                                                            <button className="btn btn-sm float-end author-search-button btn-dark"
                                                                onClick={() => searchBookCriteria(book?.volumeInfo?.authors)}
                                                            >
                                                                Search by Author
                                                            </button>

                                                            <button className="btn btn-sm float-end title-search-button btn-dark"
                                                                onClick={() => searchBookCriteria(book?.volumeInfo?.title)}
                                                            >
                                                                Search by Title
                                                            </button>
                                                        
                                                    </div>
                                                </div>
                                        </div>
                                    </li>
                                )
                              })  
                            }     
                    </ul>           

            </div>
        
        </div>
    )
}

export default GbookSearchScreen;