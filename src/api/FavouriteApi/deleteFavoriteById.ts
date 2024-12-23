// api/favorite.ts

import { useAsyncRequest } from '../request';

/**
 * 根据收藏记录ID删除收藏记录
 * @param id 收藏记录ID
 */
export function DeleteFavoriteById(id: number) {
  return useAsyncRequest<void>(`/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
