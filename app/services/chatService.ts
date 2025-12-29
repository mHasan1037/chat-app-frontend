import api from "../utils/api";

export const createOrGetConversation = async (receiverId: string) =>{
    const res = await api.post('/chats', {recipientId: receiverId});
    return res.data;
};

export const getAllConversations = async () =>{
    const res = await api.get('/chats');
    return res.data;
};

export const getMessagesByConversationId = async (conversationId: string) =>{
    const res = await api.get(`/messages/${conversationId}`);
    return res.data;
};

export const sendMessage = async (conversationId: string, text: string) =>{
    const res = await api.post('/messages', {conversationId, content: text});
    return res.data;
};