import { useRequest } from "../request";

import type { ChatRoomSend, ChatRoomReturn } from "@/model/dto/ChatRoomApi/ChatRoom";

export function UpdateChatRoom(id:number,data: ChatRoomSend) {
    return useRequest<ChatRoomReturn>(`/chat-rooms/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}