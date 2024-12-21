import { useRequest } from "../request";
import type { FriendshipSend, FriendshipReturn} from "@/model/dto/FriendshipApi/Friendship";
import type { FriendRequestSend, FriendRequestReturn } from "@/model/dto/FriendRequestApi/FriendRequest";

export function SendFriendRequest(data: FriendRequestSend) {
  return useRequest<FriendRequestReturn | null>('/friend-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
