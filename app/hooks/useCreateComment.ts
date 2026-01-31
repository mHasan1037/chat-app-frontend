import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "../services/commentService";

export const useCreateComment = (postId: string) =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (content: string) =>
            createComment({postId, content}),
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
            queryClient.invalidateQueries({queryKey: ['feed-posts']});
            queryClient.invalidateQueries({queryKey: ['user-posts'], exact: false})
        }
    })
}