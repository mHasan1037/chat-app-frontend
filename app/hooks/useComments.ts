import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../services/commentService";

export const useComments = (postId: string) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getComments({ postId, pageParam }),
    initialPageParam: undefined,
    enabled: !!postId,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });
};
