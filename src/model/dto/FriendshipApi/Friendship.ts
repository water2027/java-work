// 后端定义：
// private Long id;
// private Long userId;
// private Long friendId;
// private LocalDateTime createdAt;

export interface FriendshipSend {
  userId: number;
  friendId: number;
  createdAt: Date;
}

export interface FriendshipReturn {
  id: number;
  userId: number;
  friendId: number;
  createdAt: Date;
}
