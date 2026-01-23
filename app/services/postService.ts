import { CreatePostPayload } from "../types/postType";
import api from "../utils/api";

export const createPost = async (payload: CreatePostPayload) => {
  const res = await api.post("/posts", payload);
  return res;
};

export const getFeedPosts = async ({ pageParam }: { pageParam?: string }) => {
  const res = await api.get("/posts/feed", {
    params: {
      cursor: pageParam,
      limit: 10,
    },
  });

  return res.data;
};

export const getUserPosts = async ({
  userId,
  pageParam,
}: {
  userId: string;
  pageParam?: string;
}) => {
    
  const res = await api.get(`/posts/user/${userId}`, {
    params: {
      cursor: pageParam,
      limit: 10,
    },
  });

  return res.data;
};
