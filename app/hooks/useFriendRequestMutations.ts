import { useMutation, useQueryClient } from "@tanstack/react-query"
import { acceptFriendRequest, declineFriendRequest } from "../services/friendRequestService";

export const useFriendRequestMutations = () =>{
    const queryClient = useQueryClient();

    return{
        accept: useMutation({
            mutationFn: acceptFriendRequest,
            onSuccess: () =>{
                queryClient.invalidateQueries({queryKey: ['friend-requests']});
                queryClient.invalidateQueries({queryKey: ["friends"]});
            }
        }),
        decline: useMutation({
            mutationFn: declineFriendRequest,
            onSuccess: ()=>{
                queryClient.invalidateQueries({queryKey: ["friend-requests"]})
            }
        })
    }
}