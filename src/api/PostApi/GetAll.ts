// api/post.ts

import { useRequest } from '../request';
import type { PostReturn } from '@/model/dto/PostApi/Post';

/**
 * 获取所有帖子
 */
export function GetAllPosts() {
  return useRequest<PostReturn[] | null>('/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  );
}
