import axiosInstance from "@/lib/axiosInstance";
import type { getUserResponse, PostUserPayload, postUserResponse } from "@/types/user/userTypes"

export const getUser = async (): Promise<getUserResponse> => {
    try {
        const response = await axiosInstance.get('/api/endpoint')
        return response.data
    } catch (e) {
        console.error("Error while fetch data user:", e);
        throw new Error("Error while fetch data user")
    }
}

export const postUser = async (data: PostUserPayload): Promise<postUserResponse> => {
    try {
        const response = await axiosInstance.post('/api/endpoint', data)
        return response.data
    } catch (e) {
        console.error("Error while fetch data user:", e);
        throw new Error("Error while fetch data user")
    }
}

//another async function here