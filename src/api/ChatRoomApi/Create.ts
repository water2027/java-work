import { useRequest } from "../request";

import type { ChatRoomSend, ChatRoomReturn } from "@/model/dto/ChatRoomApi/ChatRoom";

export function CreateChatRoom(data: ChatRoomSend) {
  return useRequest<ChatRoomReturn|null>('/chat-rooms',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}