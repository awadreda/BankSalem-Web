import axios from 'axios'
import { Client } from '../Types/types';

const api = axios.create({
  baseURL: `http://localhost:5225/api`, // Use the proxy
  headers: {
    "Content-Type": "application/json",
  },
});


export const getClients = async () => {
  try {
    const response = await api.get(`/Clients/All`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};


 export const addNewClient = async (client:Client) => {

  try {
    const response = await api.post(`/Clients`,client,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    });

    console.log(response);
    return  response;
    
  } 
  catch (error) {
    console.error("Error adding new client:", error);
    throw error;
  } finally {
    // Any cleanup code can go here
  }

}
