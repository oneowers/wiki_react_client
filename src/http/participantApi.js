import { toast } from 'react-toastify';
import axios from 'axios';
import { $authHost, $host } from "./index.js";

// Function to create a new participant
export const createParticipant = async (participant) => {
  try {
    const { data } = await $authHost.post("/api/participant", participant);
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
    console.error("Error creating participant:", error);
  }
};

// Function to get all participants with pagination
export const getAllParticipants = async (page = 1, limit = 10) => {
  try {
    const { data } = await $host.get("/api/participant", {
      params: {
        page,
        limit,
      },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
    console.error("Error fetching participants:", error);
  }
};
