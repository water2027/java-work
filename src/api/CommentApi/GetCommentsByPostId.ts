// api/comment.ts

import { useRequest } from '../request';
import type { CommentReturn } from '@/model/dto/CommentApi/Comment';

/**
 * 根据帖子ID获取评论
 * @param postId 帖子ID
 */
export function GetCommentsByPostId(postId: number) {
  return useRequest<CommentReturn[] | null>(`/comments/post/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }, false);
}
