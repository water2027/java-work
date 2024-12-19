// api/comment.ts

import { useRequest } from '../request';
import type { CommentReturn } from '@/model/dto/CommentApi/Comment';

/**
 * 根据评论ID获取评论
 * @param id 评论ID
 */
export function GetCommentById(id: number) {
  return useRequest<CommentReturn | null>(`/comments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
