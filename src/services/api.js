import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// GET
export const getUsers = () => API.get("/users");

// POST
export const addUser = (user) => API.post("/users", user);

// PUT
export const updateUser = (id, user) =>
  API.put(`/users/${id}`, user);

// DELETE
export const deleteUser = (id) =>
  API.delete(`/users/${id}`);