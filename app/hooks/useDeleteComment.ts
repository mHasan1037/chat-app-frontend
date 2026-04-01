import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../services/commentService";

export const useDeleteComment = (postId: string) =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteComment,

        onMutate: async(commentId: string) =>{
           await queryClient.cancelQueries({queryKey: ['comments', postId]});
           
           const previousData = queryClient.getQueryData(['comments', postId]);

           queryClient.setQueryData(['comments', postId], (old: any) =>{
             if(!old) return old;

             return {
                ...old,
                pages: old.pages.map((page: any) =>({
                   ...page,
                   comments: page.comments.filter(
                    (c: any) => c._id !== commentId
                   ) 
                }))
             }
           })
           return {previousData}
        },
        onError: (_err, _id, context) =>{
            queryClient.setQueryData(
                ['comments', postId],
                context?.previousData
            )
        },
        
        onSettled: () =>{
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
            queryClient.invalidateQueries({queryKey: ['feed-posts']});
            queryClient.invalidateQueries({queryKey: ['user-posts'], exact: false})
        }
    })
}