// api/comment.ts

import { useRequest } from '../request';
import type { CommentReturn } from '@/model/dto/CommentApi/Comment';

/**
 * 根据作者ID获取评论
 * @param userId 作者ID
 */
export function GetCommentsByAuthorId(userId: number) {
  return useRequest<CommentReturn[] | null>(`/comments/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
