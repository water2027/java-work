// api/favorite.ts

import { useRequest } from '../request';

/**
 * 根据帖子ID删除该帖子的所有收藏记录
 * @param postId 帖子ID
 */
export function DeleteFavoritesByPostId(postId: number) {
  return useRequest<void>(`/favorites/deleteByPost/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }, false);
}
