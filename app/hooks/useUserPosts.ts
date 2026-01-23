import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "../services/postService";

export const useUserPosts = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["user-posts", userId],
    queryFn: ({pageParam}) => getUserPosts({userId, pageParam}),
    initialPageParam: undefined,
    enabled: !!userId,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
  });
};
