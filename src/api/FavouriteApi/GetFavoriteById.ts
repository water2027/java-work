// api/favorite.ts

import { useRequest } from '../request';
import type { FavoriteReturn } from '@/model/dto/FavoriteApi/Favorite';

/**
 * 根据收藏ID获取收藏记录
 * @param id 收藏记录ID
 */
export function GetFavoriteById(id: number) {
  return useRequest<FavoriteReturn | null>(`/favorites/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }, false);
}
