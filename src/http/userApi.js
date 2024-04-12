import { $authHost, $host } from ".";
import {jwtDecode as jwt_decode} from "jwt-decode"; 

export const registration = async (phone_number, password) => {
  const { data } = await $host.post('/api/user/registration', { phone_number, password, role: 'ADMIN' });
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token); // Use `jwtDecode` function
};

export const login = async (phone_number, password) => {
  const { data } = await $host.post('/api/user/login', { phone_number, password });
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token); // Use `jwtDecode` function
};

export const check = async () => {
  const { data } = await $authHost.get('/api/user/auth');
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token); // Use `jwtDecode` function
};
