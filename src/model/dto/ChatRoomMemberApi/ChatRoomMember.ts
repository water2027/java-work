export interface ChatRoomMemberSend{
  chatRoomId: number; // 聊天室 ID
  userId: number; // 用户 ID
  joinedAt?: string; // 加入时间（返回格式化后的时间）
  isActive?: boolean; // 是否活跃
}

export interface ChatRoomMemberReturn{
  id: number; // 成员 ID
  chatRoomId: number; // 聊天室 ID
  userId: number; // 用户 ID
  joinedAt: string; // 加入时间（返回格式化后的时间）
  isActive: boolean; // 是否活跃
}
