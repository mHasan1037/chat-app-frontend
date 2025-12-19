import { useQuery } from "@tanstack/react-query"
import { IFriendType } from "../types/friendType"
import { getAllFriendLists } from "../services/friendRequestService"

export const useFriends = () =>{
    return useQuery<IFriendType[]>({
        queryKey: ['friends'],
        queryFn: getAllFriendLists,
    })
}