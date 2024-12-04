import { useRequest } from '../request';

import { type DeleteUserReturn } from '@/model/dto/UserApi/DeleteUser';

export function DeleteUser(id: number) {
  return useRequest<DeleteUserReturn|null>(
    `/users/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  );
}
