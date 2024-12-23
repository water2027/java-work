import { useRequest } from "../request";

import type { ChatRoomReturn } from "@/model/dto/ChatRoomApi/ChatRoom";

export function GetAllChatRooms() {
  return useRequest<ChatRoomReturn[]|null>('/chat-rooms');
}

export function GetPublicChatRoomsByUserId(userId: number) {
  return useRequest<ChatRoomReturn[]|null>(`/chat-room-members/user/${userId}/public-chat-rooms`);
}

export function GetPrivateChatRoomsByUserId(userId: number) {
  return useRequest<ChatRoomReturn[]|null>(`/chat-room-members/user/${userId}/private-chat-rooms`);
}
