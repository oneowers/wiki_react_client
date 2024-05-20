import { $authHost } from "./index.js";

export const createParticipant = async (participant) => {
  const { data } = await $authHost.post("/api/participant", participant);
  return data;
};
