// api/post.ts

import { useRequest } from '../request';
import type { PostReturn } from '@/model/dto/PostApi/Post';

/**
 * 根据用户ID获取所有帖子
 * @param userId 用户ID
 */
export function GetPostsByUser(userId: number) {
  return useRequest<PostReturn[] | null>(`/posts/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
