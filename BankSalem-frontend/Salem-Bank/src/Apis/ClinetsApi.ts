import axios from 'axios'

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
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};



