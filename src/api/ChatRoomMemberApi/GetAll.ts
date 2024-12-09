import { useRequest } from '../request';

import { type UserInfo } from '@/model/dto/UserApi/UserInfo';

export function GetAllMember(chatRoomId: number) {
  return useRequest<UserInfo[]>(`/chat-room-members/chat-room/${chatRoomId}`);
}
