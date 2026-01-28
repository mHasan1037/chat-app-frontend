import api from "../utils/api"

export const toggleLike = async (postId: string) =>{
    const res = await api.post(`/likes/${postId}`);
    return res.data;
}