<template>
  <div class="video-chat">
    <h1>视频通话</h1>
    <div class="video-container">
      <video ref="localVideo" autoplay muted></video>
      <video ref="remoteVideo" autoplay></video>
    </div>
    <div class="button-container">
      <button @click="startCall" class="call-button">开始通话</button>
      <button @click="endCall" class="call-button">结束通话</button>
    </div>
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
  .video-chat {
    font-family: 'Roboto', Arial, sans-serif;
    text-align: center;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    line-height: 1.6; /* 改善段落文本的行距 */
  }

  h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 2em; /* 增大标题字体 */
    font-weight: 700; /* 加粗标题 */
  }

  .video-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }

  video {
    width: 45%;
    max-width: 600px;
    height: auto;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px; /* 给按钮增加顶部间距 */
  }

  .call-button {
    padding: 12px 24px; /* 调整按钮填充 */
    font-size: 18px; /* 增大按钮字体 */
    font-weight: 500; /* 设置按钮字体加粗 */
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    letter-spacing: 0.5px; /* 稍微增加字母间距 */
  }

  .call-button:hover {
    background-color: #0056b3;
  }

  .call-button:active {
    transform: translateY(2px);
  }
  </style>
