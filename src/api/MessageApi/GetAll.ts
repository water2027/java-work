import { useRequest } from '../request';

import type { MessageReturn } from '@/model/dto/MessageApi/Send';

export function GetAllMessage(chatRoomId: number) {
  return useRequest<MessageReturn[]|null>(`/messages/chat-room/${chatRoomId}`);
}
