import { useRequest } from "../request";
import type { FriendshipSend, FriendshipReturn} from "@/model/dto/FriendshipApi/Friendship";
import type { FriendRequestSend, FriendRequestReturn } from "@/model/dto/FriendRequestApi/FriendRequest";

export function GetAllFriends(userId: number){
  return useRequest<FriendshipReturn[]>(`/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
