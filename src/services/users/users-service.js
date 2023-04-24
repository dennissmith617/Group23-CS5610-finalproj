import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API_URL = API_BASE ? API_BASE + "/users": "http://localhost:4000/api/users";

const api = axios.create({withCredentials: true});

export const findAllUsers = async () => {
    const response = await axios.get(USERS_API_URL);
    return response.data;
};

export const findUserById = async (id) => {
    const response =  await axios.get(`${USERS_API_URL}/${id}`);
    return response.data;
};

export const createUser = (user) => {
    return axios.post(USERS_API_URL, user);
};

export const updateUser = (newUser) => {
    return axios.put(`${USERS_API_URL}/${newUser._id}`, newUser);
};

export const deleteUser = (id) => {
    return axios.delete(`${USERS_API_URL}/${id}`);
};

export const login = (user) => {
    return api.post(`${USERS_API_URL}/login`, user);
};

export const logout = () => {
    return api.post(`${USERS_API_URL}/logout`);
};

export const register = (user) => {
    return api.post(`${USERS_API_URL}/register`, user);
};

export const profile = () => {
    return api.get(`${USERS_API_URL}/profile`);
};

export const bookRead = (user_id,google_id, bookTitle) => {
    return axios.put(`${USERS_API_URL}/bookread/${user_id}/${google_id}/${bookTitle}`);
};
export const bookUnread = (user_id, google_id, bookTitle) => {
    return axios.put(`${USERS_API_URL}/bookunread/${user_id}/${google_id}/${bookTitle}`);
}

export const bookReadStatus = (user_id, google_id) => {
    return axios.get(`${USERS_API_URL}/bookreadstatus/${user_id}/${google_id}`)
}
export const getBooksRead = (user_id) =>{
    return axios.get(`${USERS_API_URL}/booksread/${user_id}`)
}
export const getBooksReadByUid = (uid) =>{
    return axios.get(`${USERS_API_URL}/anon/booksread/${uid}`)
}
export const findUserByUsername = async (username) => {
    const response = await api.get(`${USERS_API_URL}/username/${username}`);
    return response.data;
};

