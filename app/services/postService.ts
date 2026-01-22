import { CreatePostPayload } from "../types/postType";
import api from "../utils/api";

export const createPost = async (payload: CreatePostPayload) =>{
    const res = await api.post('/posts', payload);
    return res;
}