// api/comment.ts

import { useRequest } from '../request';

/**
 * 根据帖子ID删除该帖子的所有评论
 * @param postId 帖子ID
 */
export function DeleteCommentsByPostId(postId: number) {
  return useRequest<void>(`/comments/post/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }, false);
}
