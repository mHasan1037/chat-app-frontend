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
};

export const deleteProfilePicture = async (public_id: string) =>{
  const res = await api.delete(`/users/profile-picture/${public_id}`);
  return res.data;
};

export const setActiveProfilePicture = async ({ public_id }: { public_id: string }) =>{
  const res = await api.patch('/users/set-active-profile-picture', {public_id});
  return res.data;
}
