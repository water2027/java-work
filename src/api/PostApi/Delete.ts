// api/post.ts

import { useAsyncRequest } from '../request';

/**
 * 删除帖子
 * @param id 帖子ID
 */
export function DeletePost(id: number) {
  return useAsyncRequest<null>(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  );
}
