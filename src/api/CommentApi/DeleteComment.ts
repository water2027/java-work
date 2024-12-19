// api/comment.ts

import { useRequest } from '../request';

/**
 * 根据评论ID删除评论
 * @param id 评论ID
 */
export function DeleteComment(id: number) {
  return useRequest<void>(`/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
