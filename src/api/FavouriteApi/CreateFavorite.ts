// api/favorite.ts

import { useAsyncRequest } from '../request';
import type { FavoriteSend, FavoriteReturn } from '@/model/dto/FavoriteApi/Favorite';

/**
 * 创建收藏
 * @param data 包含收藏信息的 DTO
 */
export function CreateFavorite(data: FavoriteSend) {
  return useAsyncRequest<FavoriteReturn | null>(
    '/favorites/add',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
}
