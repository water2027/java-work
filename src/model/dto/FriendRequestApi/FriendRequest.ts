export interface FriendRequestSend {
  senderUserId: number;
  receiverUserId: number;
  announcement: string;
  createdAt: Date;
  status: string;
}

export interface FriendRequestReturn {
  id:number;
  senderUserId: number;
  receiverUserId: number;
  announcement: string;
  createdAt: Date;
  status: string;
}
