import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../services/postService";

type Page = {posts: any[]};

export const useUpdatePost = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePost,
        onMutate: async ({postId, content, visibility}) =>{
            await queryClient.cancelQueries({queryKey: ['feed-posts']});
            await queryClient.cancelQueries({queryKey: ['user-posts']});

            const prevFeed = queryClient.getQueryData<any>(['feed-posts']);
            const prevUserPosts = queryClient.getQueriesData<any>({
                queryKey: ['user-posts']
            });

            const updatePages = (pages: Page[]) =>
                pages.map((p) =>({
                    ...p,
                    posts: p.posts.map((post) =>
                      post._id === postId 
                        ? {
                            ...post,
                            content,
                            visibility,
                            isEdited: true
                        }
                        : post
                    )
                }));
            
            if(prevFeed?.pages){
                queryClient.setQueryData(['feed-posts'], {
                    ...prevFeed,
                    pages: updatePages(prevFeed.pages)
                })
            };

            prevUserPosts.forEach(([key, data]) =>{
                if(!data?.pages) return;
                queryClient.setQueryData(key, {
                    ...data,
                    pages: updatePages(data.pages)
                })
            });

            return {prevFeed, prevUserPosts};
        },

        onError: (_err, _vars, ctx) =>{
            if(ctx?.prevFeed){
                queryClient.setQueryData(['feed-posts'], ctx.prevFeed);
            };
            if(ctx?.prevUserPosts){
                ctx.prevUserPosts.forEach(([key, data]: any) =>{
                    queryClient.setQueryData(key, data);
                });
            }
        },

        onSettled: () =>{
            queryClient.invalidateQueries({queryKey: ['feed-posts']});
            queryClient.invalidateQueries({queryKey: ['user-posts'], exact: false});
        }
    })
}