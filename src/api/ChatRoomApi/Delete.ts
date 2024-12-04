import { useRequest } from "../request";

export function DeleteChatRoom(id:number){
    return useRequest<null>(`/chat-rooms/${id}`,{
        method: 'DELETE'
    });
}