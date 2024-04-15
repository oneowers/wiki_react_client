import { useContext } from "react";
import { $authHost, $host } from ".";
import {jwtDecode as jwt_decode} from "jwt-decode"; 
import { Context } from "..";

export const registration = async (phone_number, password) => {
  try {
    const { data } = await $host.post('/api/user/registration', { phone_number, password });
    localStorage.setItem('token', data.token)
    return {success: true, token: jwt_decode(data.token)}; 
  } catch (error) {
    return {success: false, message: error.response.data.message, error: error};
  }
};

export const login = async (phone_number, password, user) => {
  try {
    const { data } = await $host.post('/api/user/login', { phone_number, password });
    localStorage.setItem('token', data.token)
    user.setUser(user);
    user.setIsAuth(true);
    return {success: true, token: jwt_decode(data.token)}; 
  } catch (error) {
    return {success: false, message: error.response.data.message, error: error};
  }
};

export const logout = (user) => {
  localStorage.removeItem('token')
  user.setUser({})
  user.setIsAuth(false)
};

export const check = async () => {
  try {
    const { data } = await $authHost.get('/api/user/auth');
    localStorage.setItem('token', data.token)
    return {success: true, message: "С возврашением!", data: data};
  }catch (error) {
    return {success: false, message: error.response.data.message, error: error};
  }
};

export const sendVerificationSms = async (phone_number) => {
  try {
    const { data } = await $host.post('api/user/send-verification-sms', { phoneNumber: phone_number });
    return {success: true, message: "Код успешно отправлен.", data: data};
  } catch (error) {
    return {success: false, message: error.response.data.message, error: error};
  }
};

export const verifyCodeSms = async (phoneNumber, code, user) => {
  try {
    const { data } = await $host.post('api/user/verify-code', { phoneNumber: phoneNumber, code: code });
    user.setUser(data.token);
    user.setIsAuth(true);
    return {success: true, message: "Код успешно отправлен.", data: data};
  } catch (error) {
    return {success: false, message: error.response.data.message, error: error};
  }
};
