import {Link} from "react-router-dom";


function GbookScreen(){
    return (
        <div>
            <h1>Books</h1>
            <Link to = "/readit/gbook-search">Search for books</Link>
        </div>
    )
}
export default GbookScreen;