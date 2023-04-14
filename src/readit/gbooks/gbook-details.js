
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { Link } from "react-router-dom";
import { getBook } from "./gbook-service";

/* <pre>
{JSON.stringify(results,null,2)}
</pre>*/

function GbookDetails(){
    const {id} = useParams(null);
    const [results,setResults] = useState({});
    
    useEffect( ()=>{
        
        const fetchBook = async () =>{
            
            const response = await getBook(id);
            setResults(response);
        }
        fetchBook();
    },[id])

    var image_source="";
    try{
        image_source = results.volumeInfo.imageLinks.thumbnail
    }catch{
        console.log("error reading thumbnail in books details")
    }

    return(
        <div>
            <h1> Book Detail: </h1>
            <h2> Volume Id: {id} </h2>
            <Link to="/tuiter/search" > BackToSearch
            </Link>
            <div>
                <p>Title:{results?.volumeInfo?.title} </p>
                <p>Authors:{results?.volumeInfo?.authors}</p>
            </div>
            <div>
                    <img src={image_source} width="40%" height="50%" alt="book image"/>
            </div>
            <div className="text-justify fst-italic fw-light">
                
                    Description:{results?.volumeInfo?.description}
                
            </div>
            <div>
                <p>
                Publishers: {results?.volumeInfo?.publisher}
                </p>
            
            </div>
            <div>
                <p>
                PublishedDate: {results?.volumeInfo?.publishedDate}
                </p>
                
            </div>
           
        </div>
    )
}

export default GbookDetails;