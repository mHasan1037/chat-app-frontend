import api from "../utils/api"

export const sendAIMessage = async (messages: any[]) =>{
    const res = await api.post('/ai/chat', {messages});
    return res.data;
};