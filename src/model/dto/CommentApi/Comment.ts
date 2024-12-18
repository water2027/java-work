// model/dto/CommentApi/Comment.ts

export interface CommentSend {
  authorId: number;         // 作者ID
  postId: number;           // 所属帖子ID
  content: string;          // 评论内容
}

export interface CommentReturn {
  id: number;               // 评论ID
  authorId: number;         // 作者ID
  postId: number;           // 所属帖子ID
  content: string;          // 评论内容
  createdAt: string;        // 创建时间（格式："yyyy-MM-dd HH:mm:ss"）
}
