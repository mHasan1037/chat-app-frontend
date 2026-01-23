import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedPosts } from "../services/postService";

export const useFeedPosts = () => {
  return useInfiniteQuery({
    queryKey: ["feed-posts"],
    queryFn: getFeedPosts,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
  });
};
