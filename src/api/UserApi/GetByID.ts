import { useRequest } from '../request';

import type { UserInfo } from '@/model/dto/UserApi/UserInfo';

export function GetUserByID(id: number) {
  return useRequest<UserInfo>(`/users/${id}`);
}
