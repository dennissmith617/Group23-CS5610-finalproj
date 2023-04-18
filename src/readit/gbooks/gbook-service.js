import axios from "axios";
const KEY = process.env.REACT_APP_GBOOK_API_KEY;
const GBOOK_API  = "https://www.googleapis.com/books/v1";



export const fullTextSearch = async (query) => {
    const response = await axios.get(
        `${GBOOK_API}/volumes/?q=${query}`
    );
    
    return response.data;
}

export const getBook = async (id) =>{

    const response = await axios.get(
        `${GBOOK_API}/volumes/${id}`
    );
    return response.data;
}