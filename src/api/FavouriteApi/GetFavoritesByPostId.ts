// api/favorite.ts

import { useRequest } from '../request';
import type { FavoriteReturn } from '@/model/dto/FavoriteApi/Favorite';

/**
 * 根据帖子ID获取所有收藏记录
 * @param postId 帖子ID
 */
export function GetFavoritesByPostId(postId: number) {
  return useRequest<FavoriteReturn[] | null>(`/favorites/byPost/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }, false);
}
