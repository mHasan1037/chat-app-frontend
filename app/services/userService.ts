import api from "../utils/api";

export const searchUsers = async (query: string) => {
  const res = await api.get(`/users/search?query=${query}`);
  return res.data;
};

export const getUserProfile = async (id: string) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
