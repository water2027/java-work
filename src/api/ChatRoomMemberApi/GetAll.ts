import type { ChatRoomMemberReturn, ChatRoomMemberSend } from '@/model/dto/ChatRoomMemberApi/ChatRoomMember';
import { useRequest, useAsyncRequest } from '../request';

export function GetAllMember(chatRoomId: number) {
  return useRequest<ChatRoomMemberReturn[]>(`/chat-room-members/chat-room/${chatRoomId}`);
}


export function addMemberToChatRoom(chatRoomMember: ChatRoomMemberSend){
  return useAsyncRequest<ChatRoomMemberReturn|null>('/chat-room-members', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chatRoomMember),
  });
}
