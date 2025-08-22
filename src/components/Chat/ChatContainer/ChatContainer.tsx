"use client";

import AssistantsList from "@/components/Assistants/AssistantsList/AssistantsList";
import AgentItem from "@/components/Chat/AgentItem/AgentItem";
import ChatInput from "@/components/Chat/ChatInput";
import ImageItem from "@/components/Chat/ImageItem/ImageItem";
import SystemItem from "@/components/Chat/SystemItem/SystemItem";
import UserItem from "@/components/Chat/UserItem/UserItem";
import {useMessage} from "@/hooks/useMessage";
import {IMessage} from "@/lib/messages-types";
import {getCurrentChat, useChatStore} from "@/stores/chatStore";
import {useEffect} from "react";

const ChatContainer = ({id}: {id: string}) => {
  const {messages, disconnect, connect} = useMessage();
  const {createChat, addMessage} = useChatStore();
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
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

  return (
    <div className="flex flex-row max-w-5xl h-full mx-auto min-h-screen divide-x divide-white/10 gap-8 pt-24 lg:pt-6">
      <AssistantsList />

      <div className="flex flex-col gap-2 w-full lg:w-3/4 h-full min-h-screen ">
        {!getCurrentChat()?.messages.length ? (
          <div className="flex flex-col gap-3 h-full overflow-y-auto overflow-x-hidden flex-grow max-h-[calc(100vh-14rem)] items-center justify-center">
            <p className="text-center text-white font-bold text-2xl lg:text-3xl">
              Hello,
              <br /> I&apos;m your assistant.
              <br /> How can I help you today?
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 h-full overflow-y-auto overflow-x-hidden flex-grow max-h-[calc(100vh-12rem)]">
            <h3 className="text-white font-bold text-2xl lg:text-3xl text-center">{getCurrentChat()?.name}</h3>

            {getCurrentChat()?.messages.map((message, index) =>
              message.origin === "user" ? (
                <UserItem key={`${index}-${message.message}`} {...message} />
              ) : message.origin === "system" ? (
                <SystemItem key={`${index}-${message.message}`} {...message} />
              ) : message.origin === "image" ? (
                <ImageItem key={`${index}-${message.message}`} {...message} />
              ) : (
                <AgentItem key={`${index}-${message.message}`} {...message} />
              )
            )}
          </div>
        )}
        <ChatInput onSend={handlerSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
