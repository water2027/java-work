// api/post.ts

import { useRequest } from '../request';
import type { PostSend, PostReturn } from '@/model/dto/PostApi/Post';

/**
 * 创建帖子
 * @param data 包含帖子信息的 DTO
 */
export function CreatePost(data: PostSend) {
  return useRequest<PostReturn | null>(
    '/posts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
}
