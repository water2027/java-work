import { useRequest } from "../request";

import type { ChatRoomReturn } from "@/model/dto/ChatRoomApi/ChatRoom";

export function GetChatRoomByID(id:number){
    return useRequest<ChatRoomReturn|null>(`/chat-rooms/${id}`);
}