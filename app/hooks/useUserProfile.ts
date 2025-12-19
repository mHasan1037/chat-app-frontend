import { useQuery } from "@tanstack/react-query"
import { IUserProfile } from "../types/usertype"
import { getUserProfile } from "../services/userService"

export const useUserProfile = (userId: string) =>{
    return useQuery<IUserProfile>({
        queryKey: ['user-profile', userId],
        queryFn: () => getUserProfile(userId),
        enabled: !!userId
    })
};