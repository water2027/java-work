import { useRequest } from "../request";

import type { ChatRoomReturn } from "@/model/dto/ChatRoomApi/ChatRoom";

export function GetAllChatRooms() {
  return useRequest<ChatRoomReturn[]|null>('/chat-rooms');
}