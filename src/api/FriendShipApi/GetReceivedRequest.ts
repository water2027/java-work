import { useRequest } from "../request";
// import type { FriendshipSend, FriendshipReturn} from "@/model/dto/FriendshipApi/Friendship";
import type { FriendRequestSend, FriendRequestReturn } from "@/model/dto/FriendRequestApi/FriendRequest";

export function GetReceivedRequests(receiverUserId: number) {
  return useRequest<FriendRequestReturn[]>(`/friend-requests/received/${receiverUserId}`, {
    method: 'GET'
  });
}
