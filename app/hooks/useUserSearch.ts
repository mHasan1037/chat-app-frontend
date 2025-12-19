import { useQuery } from "@tanstack/react-query"
import { IUserSearchResult } from "../types/friendType"
import { searchUsers } from "../services/userService"

export const useUserSearch = (query: string) =>{
    return useQuery<IUserSearchResult[]>({
        queryKey: ['user-search', query],
        queryFn: () => searchUsers(query),
        enabled: !!query.trim(),
    })
}