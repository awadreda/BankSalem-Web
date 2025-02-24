import axios from "axios";
import { Client, ClientLogin } from "../Types/types";

const api = axios.create({
  baseURL: `https://banksalem.somee.com/api`, // Use the proxy
  // baseURL: `http://localhost:5225/api`, // Use the proxy
  headers: {
    "Content-Type": "application/json",
  },
});

export const FindClientByIdApi = async (clientID: number) => {
  try {
    const response = await api.get(`/Clients/${clientID}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    });
    console.log("response.data from FindClientByIdApi", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const FindClientByEmailAndPINCODEApi = async (clientLogin: ClientLogin) => {
  const encodedEmail = clientLogin.email?.replace(/@/g, "%40");
  try {
    const response = await api.get(
      `/Clients/EmailAndPINCODE?Email=${encodedEmail}&PINCODE=${clientLogin.pincode}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      }
    );
    
    return response.data;
    // console.log("response from ClinetsApi", response.data);
  } catch (error) {
    console.error("Error fetching client by email and PINCODE:", error);  
    throw error;
  }
};

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

export const addNewClient = async (client: Client) => {
  try {
    const response = await api.post(`/Clients`, client, {
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    });

    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error adding new client:", error);
    throw error;
  } finally {
    // Any cleanup code can go here
  }
};

export const DeleteClientApi = async (ClientID: number) => {
  try {
    const response = await api.delete(`/Clients/${ClientID}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const UpdateClientApi = async (client: Client) => {
  try {
    const response = await api.put(`/Clients/${client.id}`, client, {
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};
