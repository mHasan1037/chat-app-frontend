import { useQuery } from "@tanstack/react-query"
import { IFriendType } from "../types/friendType"
import { getAllFriendLists } from "../services/friendRequestService"

export const useFriends = (userId?: string) =>{
    return useQuery<IFriendType[]>({
        queryKey: ['friends', userId],
        queryFn: ()=> getAllFriendLists(userId),
    })
}