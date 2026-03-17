import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfilePicture } from "../services/userService";

export const useUpdateProfilePicture = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfilePicture,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['user-profile']})
        }
    })
}