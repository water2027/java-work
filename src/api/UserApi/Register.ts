import { useAsyncRequest } from '../request';

import {
  type RegisterReturn,
  type RegisterSend,
} from '@/model/dto/UserApi/Register';

export function Register(data: RegisterSend) {
  return useAsyncRequest<RegisterReturn>(
    '/users/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    false
  );
}
