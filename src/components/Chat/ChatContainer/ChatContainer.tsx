"use client";

import {useMessage} from "@/hooks/useMessage";
import {IMessage} from "@/lib/messages-types";
import {getCurrentChat, useChatStore} from "@/stores/chatStore";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const ChatContainer = ({id}: {id: string}) => {
  const {messages, disconnect, connect, isConnected} = useMessage();
  const {createChat, addMessage, chats, deleteChat} = useChatStore();
  const router = useRouter();
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      console.log("lastMessage", lastMessage);
      addMessage(id, lastMessage);
      if (lastMessage.disconnect) {
        disconnect();
      }
    }
  }, [messages, addMessage, disconnect, id]);

  const handlerSendMessage = (message: string) => {
    const newMessage: IMessage = {
      origin: "user",
      message: message,
      delay: 0,
    };
    if (!getCurrentChat()) {
      createChat({
        id: id,
        messages: [newMessage],
        name: message,
      });
    } else {
      addMessage(id, newMessage);
    }
    connect();
  };

  const handlerDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    if (chatId === id) {
      router.push("/assistants");
    }
  };

  const handlerSetCurrentChat = (chatId: string) => {
    router.push(`/assistants/${chatId}`);
  };

  return (
    <div className="flex flex-row gap-2 max-w-2xl">
      <div className="flex flex-col gap-2 w-1/4">
        <div>
          {chats.map((chat) => (
            <p key={chat.id}>
              <span onClick={() => handlerSetCurrentChat(chat.id)}>{chat.name}</span>
              <span>{chat.messages.length}</span>
              <span className="p-2" onClick={() => handlerDeleteChat(chat.id)}>
                x
              </span>
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-3/4">
        ChatContainer - {id}
        <br />
        <div>
          {getCurrentChat()?.messages.map((message, index) => (
            <p key={`${index}-${message.message}`}>{message.message}</p>
          ))}
        </div>
        <button onClick={() => handlerSendMessage("Hello")}>Send</button>
        <span>{isConnected ? "Connected" : "Disconnected"}</span>
      </div>
    </div>
  );
};

export default ChatContainer;
