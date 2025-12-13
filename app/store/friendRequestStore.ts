import { create } from "zustand";
import { IFriendRequest } from "../types/friendRequest";
import { getIncomingRequests } from "../services/friendRequestService";

interface RequestState{
    requests: IFriendRequest[];
    fetchRequests: ()=> Promise<void>;
};

export const useFriendRequestStore = create<RequestState>((set) => ({
    requests: [],
    fetchRequests: async () => {
        try{
           const data = await getIncomingRequests();
           set({requests: data});
        }catch (err){
           console.log('Failed to fetch friend requests', err);
        }
    }
}));