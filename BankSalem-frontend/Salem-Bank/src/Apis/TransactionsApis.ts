import axios from "axios";
import { Deposit_WithDraw_Request, TransferRequest } from "../Types/types";

const api = axios.create({
  baseURL: `https://banksalem.somee.com/api`, // Use the proxy
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
  },
});

export const getTransactionsApi = async () => {
  try {
    const response = await api.get(
      `/TrasnActons/All`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};



  export const DepositeApi = async (Dreq:Deposit_WithDraw_Request) => { 

    try {
      const response = await api.post(`/TrasnActons/Deposite`, Dreq, {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error Deposite:", error);
      throw error;
    }
  };


  export const WithDrawApi = async (Wreq:Deposit_WithDraw_Request) => { 

    try {
      const response = await api.post(`/TrasnActons/withDraw`, Wreq, {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error WithDraw:", error);
      throw error;
    }
  };


  export const TransferApi = async (Treq:TransferRequest) => { 

    try {
      const response = await api.post(`/TrasnActons/Transfer`, Treq, {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error Transfer:", error);
      throw error;
    }
  };





