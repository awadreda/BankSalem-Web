import axios from "axios";
import { User } from "../Types/types";


    const api = axios.create({
      baseURL: `http://localhost:5225/api`,
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
      },
    });





    export const getAllUsersApi = async () => {

      try {
      const response = await api.get(`/UserControllers/All`);
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }

    }

    export const getUserByIdApi = async (id: number) => {
      try {
        const response = await api.get(`/UserControllers/${id}`);
        return response.data;

      } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
      }
    }


    export const createUserApi = async (user: User) => {
      try {
        const response = await api.post("/UserControllers", user);
        console.log("response.data from createUserApi : ", response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }


    export const updateUserApi = async (id: number, user: User) => {
      try {
        const response = await api.put(`/UserControllers/${id}`, user);

        return response.data;
      } catch (error) {
        console.error("Error updating user:", error); 
        throw error;
      }
    } 

    export const deleteUserApi = async (id: number) => {
      try {
        const response = await api.delete(`/UserControllers/${id}`);


        return response.data;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    }     










