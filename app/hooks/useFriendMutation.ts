import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FriendAction } from "../types/friendType";
import { acceptFriendRequest, cancelFriendRequest, declineFriendRequest, sendFriendRequest } from "../services/friendRequestService";

export const useFriendMutations = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({type, id}: FriendAction) =>{
           switch (type){
             case 'ADD':
                return sendFriendRequest(id);
             case 'ACCEPT':
                return acceptFriendRequest(id);
             case 'DECLINE':
                return declineFriendRequest(id);
             case 'CANCEL':
                return cancelFriendRequest(id);
           }
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['friends']});
            queryClient.invalidateQueries({queryKey: ['user-search']});
            queryClient.invalidateQueries({queryKey: ['friend-requests']});
        }
    })
}