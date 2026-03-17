import api from "../utils/api";

export const searchUsers = async (query: string) => {
  const res = await api.get(`/users/search?query=${query}`);
  return res.data;
};

export const getUserProfile = async (id: string) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const updateProfilePicture = async (image: {
  url: string;
  public_id: string;
}) =>{
  const res = await api.patch('/users/profile-picture', image);
  return res.data;
}
