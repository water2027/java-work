// api/post.ts

import { useRequest } from '../request';
import type { PostReturn } from '@/model/dto/PostApi/Post';

/**
 * 根据帖子ID查询帖子
 * @param id 帖子ID
 */
export function GetPostById(id: number) {
  return useRequest<PostReturn | null>(`/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  false);
}
