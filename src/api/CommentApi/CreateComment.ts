// api/comment.ts

import { useAsyncRequest } from '../request';
import type { CommentSend, CommentReturn } from '@/model/dto/CommentApi/Comment';

/**
 * 创建评论
 * @param data 包含评论信息的 DTO
 */
export function CreateComment(data: CommentSend) {
  return useAsyncRequest<CommentReturn | null>(
    '/comments',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    } // 根据你的useRequest实现决定是否需要这个参数
  );
}
