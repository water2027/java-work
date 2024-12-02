import { useRequest } from '../request';

export function useGetAll() {
  return useRequest(
    '/users'
  );
}
