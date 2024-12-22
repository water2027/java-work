// 后端定义：
// private Long id;
// private Long userId;
// private Long friendId;
// private LocalDateTime createdAt;

export interface FriendshipSend {
  user1Id: number;
  user2Id: number;
  createdAt: Date;
}

export interface FriendshipReturn {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: Date;
}
