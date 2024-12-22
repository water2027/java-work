import { useRequest } from "../request";
import type { FriendshipSend, FriendshipReturn} from "@/model/dto/FriendshipApi/Friendship";
import type { FriendRequestSend, FriendRequestReturn } from "@/model/dto/FriendRequestApi/FriendRequest";

export function DeleteFriendship(userId:number, friendId: number){
  return useRequest<void>(`/friendships/user/${userId}/friend/${friendId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
