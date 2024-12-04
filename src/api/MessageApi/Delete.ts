import { useRequest } from '../request';

export function DeleteMessage(messageId: number) {
  return useRequest<null>(`/messages/${messageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
