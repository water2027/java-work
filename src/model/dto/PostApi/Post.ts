
export interface PostSend {
  authorId: number; // 作者ID
  title: string;    // 标题
  content: string;  // 内容
  imageUrls?: string[]; // 图片URL列表（可选，最多4张）
}

export interface PostReturn {
  id: number;               // 帖子ID
  authorId: number;         // 作者ID
  title: string;            // 标题
  content: string;          // 内容
  createdAt: string;        // 创建时间（格式："yyyy-MM-dd HH:mm:ss"）
  imageUrls: string[];      // 图片URL列表（最多4张）
}
