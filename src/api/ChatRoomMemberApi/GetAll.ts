import type { ChatRoomMemberReturn, ChatRoomMemberSend } from '@/model/dto/ChatRoomMemberApi/ChatRoomMember';
import { useRequest } from '../request';

import { type User } from '@/model/User';

export function GetAllMember(chatRoomId: number) {
  return useRequest<ChatRoomMemberReturn[]>(`/chat-room-members/chat-room/${chatRoomId}`);
}


export function addMemberToChatRoom(chatRoomMember: ChatRoomMemberSend){
  return useRequest<ChatRoomMemberReturn|null>('/chat-room-members', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chatRoomMember),
  });
}
