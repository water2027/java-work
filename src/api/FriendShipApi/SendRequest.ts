import { useAsyncRequest } from "../request";
import type { FriendRequestSend, FriendRequestReturn } from "@/model/dto/FriendRequestApi/FriendRequest";

export function SendFriendRequest(data: FriendRequestSend) {
  return useAsyncRequest<FriendRequestReturn | null>('/friend-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
