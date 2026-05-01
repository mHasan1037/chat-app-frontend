import { useMutation } from "@tanstack/react-query"
import { sendAIMessage } from "../services/AiService"

export const useAIChat = () =>{
    return useMutation({
        mutationFn: sendAIMessage
    })
}