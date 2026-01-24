import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../services/postService";

type FeedPage = {posts: any[]; nextCursor?: any; hasNextPage?: boolean};

export const useDeletePost = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: string) => deletePost(postId),
        onMutate: async (postId: string) =>{
            await queryClient.cancelQueries({queryKey: ['feed-posts']});
            await queryClient.cancelQueries({queryKey: ['user-posts']});

            const prevFeed = queryClient.getQueryData<any>(['feed-posts']);
            const prevUserPosts = queryClient.getQueriesData<any>({queryKey: ["user-posts"]})

            if(prevFeed?.pages){
                queryClient.setQueryData(['feed-posts'], {
                    ...prevFeed,
                    pages: prevFeed.pages.map((p: FeedPage) =>({
                        ...p,
                        posts: p.posts.filter((post: any) => post._id !== postId)
                    }))
                })
            };

            prevUserPosts.forEach(([key, data]) =>{
                if(!data?.pages) return;
                queryClient.setQueryData(key, {
                    ...data,
                    pages: data.pages.map((p: FeedPage) =>({
                        ...p,
                        posts: p.posts.filter((post: any) => post._id !== postId)
                    }))
                })
            });

            return {prevFeed, prevUserPosts};
        },

        onError: (_err, _postId, context) =>{
            if(context?.prevFeed){
                queryClient.setQueryData(['feed-posts'], context.prevFeed)
            };
            if(context?.prevUserPosts){
                context.prevUserPosts.forEach(([key, data]: any) =>{
                    queryClient.setQueryData(key, data);
                })
            }
        },

        onSettled: () =>{
            queryClient.invalidateQueries({queryKey: ['feed-posts']}),
            queryClient.invalidateQueries({queryKey: ['user-posts'], exact: false})
        }
    })
}