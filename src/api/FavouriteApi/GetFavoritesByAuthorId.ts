// api/favorite.ts

import { useRequest } from '../request';
import type { FavoriteReturn } from '@/model/dto/FavoriteApi/Favorite';

/**
 * 根据用户ID获取收藏记录
 * @param authorId 用户ID
 */
export function GetFavoritesByAuthorId(authorId: number) {
  return useRequest<FavoriteReturn[] | null>(`/favorites/byAuthor/${authorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
