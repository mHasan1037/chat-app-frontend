
import { IFriendRequest } from "../types/friendType";
import api from "../utils/api"

export const getAllFriendLists = async () =>{
    const res = await api.get('/friends');
    return res.data;
};

export const getIncomingRequests = async (): Promise<IFriendRequest[]> =>{
    const res = await api.get('/friends/requests');
    return res.data;
};

export const acceptFriendRequest = async (requestId: string | null) =>{
    const res = await api.patch(`/friends/accept/${requestId}`);
    return res.data;
};

export const declineFriendRequest = async (requestId: string | null) =>{
    const res = await api.patch(`/friends/decline/${requestId}`);
    return res.data;
};

export const cancelFriendRequest = async (requestId: string | null) =>{
    const res = await api.patch(`/friends/cancel/${requestId}`);
    return res.data;
}

export const sendFriendRequest = async (toUserId: string) =>{
    const res = await api.post('/friends/request', {to: toUserId});
    return res.data;
}

export const unfriendUser = async (userId: string | null) =>{
    const res = await api.delete(`/users/friends/${userId}`);
    return res.data;
}
