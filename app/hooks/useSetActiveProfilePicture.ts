import { useMutation, useQueryClient } from "@tanstack/react-query"
import { setActiveProfilePicture } from "../services/userService";

export const useSetActiveProfilePicture = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: setActiveProfilePicture,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user-profile']})
        }
    })
}