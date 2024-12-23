import { useAsyncRequest } from '../request';

import type { User } from '@/model/User';

export function GetUserByID(id: number) {
  return useAsyncRequest<User>(`/users/${id}`);
}
