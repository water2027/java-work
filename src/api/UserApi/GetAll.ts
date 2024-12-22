import { useRequest } from '../request';

import type { User } from '@/model/User';

export function GetAllUser() {
  return useRequest<User>('/users');
}
