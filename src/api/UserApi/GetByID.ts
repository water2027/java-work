import { useRequest } from '../request';

export function useGetByID(id: number) {
  return useRequest(
    `/users/{id}`
  );
}
