import type { ChatRoomMemberReturn } from '@/model/dto/ChatRoomMemberApi/ChatRoomMember';
import { useRequest } from '../request';

import { type User } from '@/model/User';

export function GetAllMember(chatRoomId: number) {
  return useRequest<ChatRoomMemberReturn[]>(`/chat-room-members/chat-room/${chatRoomId}`);
}
