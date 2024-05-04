import axios from 'axios';

export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error; // Throw the error so the caller can handle it appropriately
  }
};
