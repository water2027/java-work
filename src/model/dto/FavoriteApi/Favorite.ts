// model/dto/FavoriteApi/Favorite.ts

export interface FavoriteSend {
  postId: number;           // 关联的帖子ID
  authorId: number;         // 用户ID，表示谁收藏了该帖子
}

export interface FavoriteReturn {
  id: number;               // 收藏记录的自增ID
  postId: number;           // 关联的帖子ID
  authorId: number;         // 用户ID，表示谁收藏了该帖子
  createdAt: string;        // 创建时间（格式："yyyy-MM-dd HH:mm:ss"）
}
