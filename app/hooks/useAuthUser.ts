import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMe = async () =>{
    const res = await api.get('/users/me');
    return res.data;
};

export const useAuthUser = () =>{
    return useQuery({
        queryKey: ["auth-user"],
        queryFn: fetchMe,
        staleTime: Infinity
    })
};