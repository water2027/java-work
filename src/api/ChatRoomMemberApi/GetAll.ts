import { useRequest } from '../request';

import { type User } from '@/model/User';

export function GetAllMember(chatRoomId: number) {
  return useRequest<User[]>(`/chat-room-members/chat-room/${chatRoomId}`);
}
