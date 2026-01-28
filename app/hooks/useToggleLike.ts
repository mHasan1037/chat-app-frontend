import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../services/toggleLike";

type Page = {posts: any[]};

export const useToggleLike = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleLike,
        onMutate: async (postId: string) =>{
            await queryClient.cancelQueries({queryKey: ['feed-posts']});
            await queryClient.cancelQueries({queryKey: ["user-posts"]});

            const prevFeed = queryClient.getQueryData<any>(['feed-posts']);
            const prevUserPosts = queryClient.getQueriesData<any>({
                queryKey: ['user-posts']
            });

            const update = (pages: Page[]) =>
                pages.map((p) =>({
                    ...p,
                    posts: p.posts.map((post) =>
                       post._id === postId
                         ? {
                            ...post,
                            likeCount: post.likedByMe 
                            ? post.likeCount - 1
                            : post.likeCount + 1,
                            likedByMe: !post.likedByMe
                         }
                        : post
                    )
                }));

                if(prevFeed?.pages){
                    queryClient.setQueryData(['feed-posts'], {
                        ...prevFeed,
                        pages: update(prevFeed.pages)
                    })
                };

                prevUserPosts.forEach(([key, data]) =>{
                    if(!data?.pages) return;
                    queryClient.setQueryData(key, {
                        ...data,
                        pages: update(data.pages)
                    })
                });

                return {prevFeed, prevUserPosts}
        },

        onError: (_err, _id, ctx) =>{
            if(ctx?.prevFeed){
                queryClient.setQueryData(["feed-posts"], ctx.prevFeed)
            }
            if(ctx?.prevUserPosts){
                ctx.prevUserPosts.forEach(([key, data]: any) =>{
                    queryClient.setQueryData(key, data);
                })
            }
        },

        onSettled: () =>{
            queryClient.invalidateQueries({queryKey: ['feed-posts']});
            queryClient.invalidateQueries({queryKey: ['user-posts'], exact: false});
        }

    })
}