import axios from "axios";
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/";
const GOOGLE_KEY = "AIzaSyD_-NfMSG7VOaiLYWY6lRtDKyXlryHtq1o";
export const getBook = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data;
};

export const getBookTitle = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.title;
};
export const getBookPreview = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.previewLink;
};

export const getAuthorNames = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.authors;
};
export const getBookDescription = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.description;
};
export const getGoogleRating = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.averageRating;
};
export const getBookImage = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.imageLinks.small;
};

export const getBookReleaseDate = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.publishedDate;
};

export const getPageCount = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.pageCount;
};


export const getISBN = async (volumeID) => {
    const response = await axios.get(
        `${GOOGLE_BOOKS_API}volumes/${volumeID}?apikey=${GOOGLE_KEY}`
    );
    return response.data.volumeInfo.industryIdentifiers;
};
