// api/comment.ts

import { useRequest } from '../request';
import type { CommentSend, CommentReturn } from '@/model/dto/CommentApi/Comment';

/**
 * 创建评论
 * @param data 包含评论信息的 DTO
 */
export function CreateComment(data: CommentSend) {
  return useRequest<CommentReturn | null>(
    '/comments',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    false // 根据你的useRequest实现决定是否需要这个参数
  );
}
