import { useQuery } from "@tanstack/react-query"
import { getIncomingRequests } from "../services/friendRequestService"
import { IFriendRequest } from "../types/friendType"

export const useFriendRequests = () =>{
    return useQuery<IFriendRequest[]>({
        queryKey: ['friend-requests'],
        queryFn: getIncomingRequests,
    })
}