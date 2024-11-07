import axios from "axios";
import { BACKEND_URL } from "./helper";

// Utility function to get the auth token from local storage or state (adjust as needed)
const getAuthToken = () => {
    return localStorage.getItem("token"); // Assuming token is saved in local/session storage
}

// Users

export const registerUser = async (data) => {
    return await axios.post(`${BACKEND_URL}users/register`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const userLogin = async (data) => {
    return await axios.post(`${BACKEND_URL}user/login`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const getUserById = async (id) => {
    const token = getAuthToken();
    return await axios.get(`${BACKEND_URL}user/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // Pass token for authentication
    });
};

export const userLogout = async () => {
    const token = getAuthToken();
    return await axios.post(`${BACKEND_URL}users/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` } // Pass token for authentication
    });
};

// Todos

export const fetchTasksFromDatabase = async (userId) => {
    const token = getAuthToken(); // Get the auth token from wherever you store it (localStorage, cookies, etc.)
    return axios.get(`${BACKEND_URL}todos/${userId}`, { // Include userId in the URL
        headers: { Authorization: `Bearer ${token}` } // Pass token for authentication
    });
};

export const addTaskToDatabase = async (task) => {
    const token = getAuthToken();
    console.log(token)
    return axios.post(`${BACKEND_URL}todos`, task, {
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Pass token for authentication
        }
    });
};

export const editTaskInDatabase = async (id, updatedTask) => {
    const token = getAuthToken();
    return axios.put(`${BACKEND_URL}todo/${id}`, updatedTask, {
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Pass token for authentication
        }
    });
};

export const deleteTaskFromDatabase = async (id) => {
    const token = getAuthToken();
    return axios.delete(`${BACKEND_URL}todo/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // Pass token for authentication
    });
};

export const toggleTodoInDatabase = async (id) => {
    const token = getAuthToken(); // Get the token for authorization
    return axios.patch(`${BACKEND_URL}todos/toggle/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
  };