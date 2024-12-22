import { useRequest } from '../request';

import type { User } from '@/model/User';

export function GetUserByID(id: number) {
  return useRequest<User>(`/users/${id}`);
}
