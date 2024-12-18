// api/comment.ts

import { useRequest } from '../request';
import type { CommentReturn } from '@/model/dto/CommentApi/Comment';

/**
 * 获取所有评论
 */
export function GetAllComments() {
  return useRequest<CommentReturn[] | null>('/comments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }, false);
}
