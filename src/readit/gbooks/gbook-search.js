import { useEffect, useState } from "react";
import { fullTextSearch } from "./gbook-service";
import { Link, useNavigate, useParams } from "react-router-dom";

function GbookSearchScreen(){
    const {searchterm} = useParams();
    const [search, setSearch]=useState(searchterm);
    const [results, setResults]=useState({});

    const navigate = useNavigate();
    const searchBook = async () => {
        
        const response = await fullTextSearch(search);
        console.log(results);
        setResults(response);
        navigate(`/readit/search/${search}`)
    }
    useEffect( ()=>{
        if(searchterm){
            searchBook();
        }
    },[searchterm]
    
    )
    
    return (
        <div className="gbook-serach">
            <h1>Google Book Search</h1>
            <input
                type="text"
                value={search} 
                onChange={(e) =>setSearch(e.target.value)}
            />
            <button onClick={searchBook}>
                Search
            </button>
            <h2>Books</h2>
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                        <tr>
                            {
                              results.items && results.items.map((book)=>{
                                var image_source="";
                                    try{
                                        image_source = book.volumeInfo.imageLinks.thumbnail
                                    }catch{
                                        console.log("error reading thumbnail")
                                    }
                                return(
                                    <td>
                                          <img src={image_source} alt="book image"/>
                                        <h3><p>{book.volumeInfo.title}</p></h3>
                                      
                                     
                                    </td>
                                )
                              })  
                            }
                        </tr>
                    </tbody>
                </table>

            </div>            
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
                                    <li className="list-group-item d-flex flex-row">
                                        <Link to={`/readit/details/${book.id}`}>
                                            <div className="d-flex flex-row">
                                                <img src={image_source} alt="book image"/>
                                                <div>  
                                                    <h3>Title:{book.volumeInfo.title}</h3>
                                                    <h3>Author:{book.volumeInfo.authors}</h3>
                                                </div>
                                            </div>
                                        </Link>
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