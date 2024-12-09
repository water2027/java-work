<template>
  <div class="video-chat">
    <h1>视频通话</h1>
    <div class="video-container">
      <video ref="localVideo" autoplay muted></video>
      <video ref="remoteVideo" autoplay></video>
    </div>
    <button @click="startCall">开始通话</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Client } from "@stomp/stompjs";

export default defineComponent({
  name: "VideoChat",
  setup() {
    const localVideo = ref<HTMLVideoElement | null>(null);
    const remoteVideo = ref<HTMLVideoElement | null>(null);
    const peerConnection = ref<RTCPeerConnection | null>(null);
    const localStream = ref<MediaStream | null>(null);

    const chatRoomId = "2"; // 示例聊天室 ID
    const stompClient = ref<Client | null>(null);

    const iceServers = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // 公共 STUN 服务器
      ],
    };

    // 初始化 WebRTC
    const initWebRTC = async () => {
      localStream.value = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideo.value) {
        localVideo.value.srcObject = localStream.value;
      }

      peerConnection.value = new RTCPeerConnection(iceServers);

      localStream.value.getTracks().forEach((track) => {
        peerConnection.value?.addTrack(track, localStream.value!);
      });

      peerConnection.value.ontrack = (event) => {
        if (remoteVideo.value) {
          remoteVideo.value.srcObject = event.streams[0];
        }
      };

      peerConnection.value.onicecandidate = (event) => {
        if (event.candidate) {
          sendSignal("candidate", {
            candidate: event.candidate,
            chatRoomId,
          });
        }
      };
    };

    // 初始化 STOMP 客户端
    const initStompClient = () => {
      stompClient.value = new Client({
        brokerURL: "ws://localhost:8080/ws/chat", // 后端 STOMP WebSocket 地址
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("STOMP connected!");

          // 订阅视频通话的信令消息
          stompClient.value?.subscribe(`/topic/video/${chatRoomId}`, (message) => {
            const signal = JSON.parse(message.body);
            if (signal.type === "offer") {
              handleOffer(signal);
            } else if (signal.type === "answer") {
              handleAnswer(signal);
            } else if (signal.type === "candidate") {
              handleCandidate(signal);
            }
          });
        },
        onDisconnect: () => {
          console.log("STOMP disconnected!");
        },
      });

      stompClient.value.activate();
    };

    // 处理信令
    const handleOffer = async (signal: any) => {
      await peerConnection.value?.setRemoteDescription(
        new RTCSessionDescription(signal.offer)
      );

      const answer = await peerConnection.value?.createAnswer();
      await peerConnection.value?.setLocalDescription(answer!);

      sendSignal("answer", {
        answer,
        chatRoomId,
      });
    };

    const handleAnswer = async (signal: any) => {
      await peerConnection.value?.setRemoteDescription(
        new RTCSessionDescription(signal.answer)
      );
    };

    const handleCandidate = (signal: any) => {
      peerConnection.value?.addIceCandidate(new RTCIceCandidate(signal.candidate));
    };

    // 发送信令
    const sendSignal = (type: string, data: any) => {
      if (stompClient.value?.connected) {
        stompClient.value.publish({
          destination: `/app/send${type.charAt(0).toUpperCase() + type.slice(1)}`,
          body: JSON.stringify(data),
        });
      }
    };

    // 开始通话
    const startCall = async () => {
      const offer = await peerConnection.value?.createOffer();
      await peerConnection.value?.setLocalDescription(offer!);

      sendSignal("offer", {
        offer,
        chatRoomId,
      });
    };

    onMounted(() => {
      initWebRTC();
      initStompClient();
    });

    return { localVideo, remoteVideo, startCall };
  },
});
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: space-around;
}
video {
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
