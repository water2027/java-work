import { useRequest } from '../request';

import type { UserInfo } from '@/model/dto/UserApi/UserInfo';

export function GetAllUser() {
  return useRequest<UserInfo>('/users');
}
