import { useRequest } from "../request";
// import type { FriendshipSend, FriendshipReturn} from "@/model/dto/FriendshipApi/Friendship";
// import type { FriendRequestSend, FriendRequestReturn } from "@/model/dto/FriendRequestApi/FriendRequest";

export function RejectFriendRequest(requestId: number) {
  return useRequest<void>(`/friend-requests/${requestId}/reject`, {
    method: 'POST'
  });
}
