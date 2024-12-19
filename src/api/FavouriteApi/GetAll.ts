// api/favorite.ts

import { useRequest } from '../request';
import type { FavoriteReturn } from '@/model/dto/FavoriteApi/Favorite';

/**
 * 获取所有收藏记录
 */
export function GetAllFavorites() {
  return useRequest<FavoriteReturn[] | null>('/favorites/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
