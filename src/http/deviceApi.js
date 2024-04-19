import { $authHost, $host } from ".";

export const createType = async (type) => {
  const { data } = await $authHost.post('/api/type', type);
  return data 
};

export const fetchTypes = async () => {
  const { data } = await $authHost.get('/api/type');
  return data
};
 
export const createBrand = async (brand) => {
  const { data } = await $authHost.post('/api/brand', brand);
  return data 
};

export const fetchBrands = async () => {
  const { data } = await $authHost.get('/api/brand', );
  return data
};
 
export const createDevice = async (device) => {
  const { data } = await $authHost.post('/api/device', device);
  return data 
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $authHost.get('/api/device', {params: {typeId, brandId, page, limit}});
  return data
};
 
export const fetchOneDevices = async (id) => {
  const { data } = await $authHost.get('/api/device/' + id);
  return data
};

export const fetchManyDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $authHost.get('/api/devices', { params: { typeId, brandId, page, limit } });
  return data;
};

export const fetchDeviceComments = async (deviceId) => {
  const { data } = await $authHost.get(`/api/device/comments/${deviceId}`);
  return data;
};

export const fetchLatestDevices = async (count) => {
  const { data } = await $authHost.get(`/api/device/latest/${count}`);
  return data;
};

export const createDeviceComment = async (deviceId, text) => {
  try {
    const { data } = await $authHost.post('/api/device/create-comment', { device_id: deviceId, text });
    return data;
  } catch (error) {
    throw new Error("Error creating comment: " + error.message);
  }
};



 


