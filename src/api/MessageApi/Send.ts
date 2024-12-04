import { useRequest } from '../request';

import type { MessageSend, MessageReturn } from '@/model/dto/MessageApi/Send';

export function SendMessage(data: MessageSend) {
  return useRequest<MessageReturn|null>(
    '/messages',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    true
  );
}
