import axios from 'axios';
import { $authHost, $host } from './index.js'; // Ensure these are correctly set up

export const createParticipant = async (participant) => {
  try {
    const { data } = await $host.post('/api/participant', participant);
    return data;
  } catch (error) {
    throw new Error('Error creating participant: ' + error.message);
  }
};