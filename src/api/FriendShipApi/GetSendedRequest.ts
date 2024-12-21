import { useRequest } from "../request";
// import type { FriendshipSend, FriendshipReturn} from "@/model/dto/FriendshipApi/Friendship";
import type { FriendRequestSend, FriendRequestReturn } from "@/model/dto/FriendRequestApi/FriendRequest";

export function GetSentRequests(senderUserId: number) {
  return useRequest<FriendRequestReturn[]>(`/friend-requests/sent/${senderUserId}`, {
    method: 'GET'
  });
}
