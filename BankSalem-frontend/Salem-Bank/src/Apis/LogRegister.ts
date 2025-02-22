import axios from "axios";
import { LogType } from "../Types/types";



const api = axios.create({
  baseURL: `https://banksalem.somee.com/api`, // Use the proxy
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
  },
});

export const getLogRegisterList = async () => {
  
  try {
    const response = await api.get("/LogRegister/LogRegisterList");
  return response.data;
} catch (error) {
  console.error("Error fetching log register list:", error);
  throw error;
}
};  

export const RegistLog = async (log: LogType) => {
  try {
    const response = await api.post(`/LogRegister/RegistLog?userID=${log.userID}&LogTypeID=${log.logTypeID}`);
    return response.data;
  } catch (error) {
    console.error("Error registering log:", error);
    throw error;
  }
};

export const getUserLogRegisterList = async (userID: number) => {
  try {
    const response = await api.get(`/LogRegister/GetUserLogRegister?userID=${userID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user log register list:", error);
    throw error;
  }
};  













