
    import { toast } from 'react-toastify';
    import axios from 'axios';
    import { $authHost, $host } from "./index.js";

    
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
    