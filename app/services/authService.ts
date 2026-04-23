import api from "../utils/api";

export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await api.post('/auth/register', data);
    return res.data;
};

export const loginUser = async (data: {
    email: string;
    password: string;
}) =>{
    const res = await api.post('/auth/login', data);
    return res.data
;}

export const sendResetPasswordEmail = async (email: string) =>{
    const res = await api.post('/auth/reset-password-link', {email});
    console.log('res', res.data)
    return res.data;
}

export const resetPassword = async (data: {
    userId: string;
    password: string;
    confirmPassword: string;
}) =>{
    const res = await api.post(`/auth/reset-password/${data.userId}`, data);
    return res.data;
}