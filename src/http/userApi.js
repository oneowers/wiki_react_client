import { $authHost, $host } from "./index.js";
import { jwtDecode as jwt_decode } from "jwt-decode"; 

export const registration = async (phone_number, password, first_name, userStore) => {
  try {
    const { data, status } = await $host.post('/api/user/registration', { phone_number, password, first_name });
    
    // Если сервер вернул 204, значит токена еще нет (нужно подтверждение SMS)
    if (status === 204 || !data?.token) {
      return { success: true, message: "NODE_CREATED: ПРОВЕРЬТЕ SMS" };
    }

    localStorage.setItem('token', data.token);
    const decoded = jwt_decode(data.token);
    userStore.setUser(decoded);
    userStore.setIsAuth(true);
    return { success: true, message: "NODE_CREATED: СЕССИЯ ИНИЦИАЛИЗИРОВАНА", token: decoded }; 
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "REGISTRY_ERROR", error };
  }
};

export const login = async (phone_number, password, userStore) => {
  try {
    const { data } = await $host.post('/api/user/login', { phone_number, password });
    localStorage.setItem('token', data.token);
    
    const decoded = jwt_decode(data.token);
    userStore.setUser(decoded);
    userStore.setIsAuth(true);
    
    return { success: true, message: "ACCESS_GRANTED: СВЯЗЬ УСТАНОВЛЕНА", token: decoded }; 
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "LOGIN_DENIED", error };
  }
};

export const logout = (userStore) => {
  localStorage.removeItem('token');
  userStore.setUser({});
  userStore.setIsAuth(false);
};

// Исправлено: передаем userStore как аргумент
export const check = async (userStore) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { success: false };

    const { data } = await $authHost.get('/api/user/auth');
    localStorage.setItem('token', data.token);
    
    const decoded = jwt_decode(data.token);
    userStore.setUser(decoded);
    userStore.setIsAuth(true);

    return { success: true, message: "SYSTEM_RECONNECTED", data: decoded };
  } catch (error) {
    localStorage.removeItem('token'); // Если токен протух - чистим
    return { success: false, message: "SESSION_EXPIRED" };
  }
};

export const sendVerificationSms = async (phone_number) => {
  try {
    const { data } = await $host.post('api/user/send-verification-sms', { phoneNumber: phone_number });
    return { success: true, message: "SMS_CODE_DISPATCHED", data: data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "SMS_DISPATCH_FAILED" };
  }
};

export const verifyCodeSms = async (phoneNumber, code, userStore) => {
  try {
    const { data } = await $host.post('api/user/verify-code', { phoneNumber: phoneNumber, code: code });
    
    if (data.token) {
        localStorage.setItem('token', data.token);
        const decoded = jwt_decode(data.token);
        userStore.setUser(decoded);
        userStore.setIsAuth(true);
        return { success: true, message: "VERIFICATION_COMPLETE: ACCESS_KEY_VALID", data: decoded };
    }
    
    return { success: false, message: "TOKEN_MISSING_IN_RESPONSE" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "INVALID_CODE" };
  }
};

export const updateProfile = async (id, first_name, profile_image, role, userStore) => {
  try {
    // Делаем PUT запрос к бэкенду. 
    // ВНИМАНИЕ: Убедитесь, что роут '/api/user/update' совпадает с вашим бэкендом (возможно это '/api/user/' + id)
    const { data } = await $authHost.put('/api/user/update', { id, first_name, profile_image, role });
    
    // Если сервер после обновления возвращает новый JWT токен (чтобы данные не пропали при F5):
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      const decoded = jwt_decode(data.token);
      userStore.setUser(decoded);
    } else {
      // Иначе просто обновляем часть данных локально 
      userStore.setUser({
        ...userStore.user,
        first_name,
        profile_image,
        role
      });
    }
    
    return { success: true, message: "PROFILE_UPDATED" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "UPDATE_FAILED" };
  }
};

export const googleAuth = async (access_token, userStore) => {
  try {
    const { data } = await $host.post('/api/user/google', { token: access_token });
    localStorage.setItem('token', data.token);
    const decoded = jwt_decode(data.token);
    userStore.setUser(decoded);
    userStore.setIsAuth(true);
    return { success: true, message: "GOOGLE_AUTH: СЕССИЯ ИНИЦИАЛИЗИРОВАНА" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "GOOGLE_AUTH_FAILED" };
  }
};