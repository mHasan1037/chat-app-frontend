import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "../services/postService";

export const useCreatePost = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['feed-posts']});
            queryClient.invalidateQueries({queryKey: ['user-posts']});
        }
    })
}