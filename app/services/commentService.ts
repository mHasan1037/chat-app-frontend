import api from "../utils/api";

export const createComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  const res = await api.post(`/comments/${postId}`, { content });
  return res.data;
};

export const getComments = async ({
  postId,
  pageParam,
}: {
  postId: string;
  pageParam?: string;
}) => {
  const res = await api.get(`/comments/${postId}`, {
    params: { cursor: pageParam, limit: 10 },
  });
  return res.data;
};
