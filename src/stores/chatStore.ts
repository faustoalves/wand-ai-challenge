import {IChat} from "@/lib/chat-types";
import {IMessage} from "@/lib/messages-types";
import {create} from "zustand";
import {persist} from "zustand/middleware";

type ChatStore = {
  currentChatId: string | null;
  chats: IChat[];
  setCurrentChat: (chat: string) => void; // set the current chat id
  createChat: (chat: IChat) => void;
  deleteChat: (id: string) => void;
  addMessage: (chatId: string, message: IMessage) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      currentChatId: null,
      chats: [],
      setCurrentChat: (chat) => {
        set({currentChatId: chat});
      },
      createChat: (chat) => {
        set((state) => ({chats: [...state.chats, chat]}));
      },
      deleteChat: (id) => {
        set((state) => ({chats: state.chats.filter((chat) => chat.id !== id)}));
      },
      addMessage: (chatId, message) => {
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              const messages = chat.messages || [];
              const existingMessageIndex = messages.findIndex(
                (m) => m.timeStamp === message.timeStamp && m.agentId === message.agentId && m.origin === "agent"
              );

              if (existingMessageIndex !== -1) {
                // Update existing message status
                const updatedMessages = [...messages];
                updatedMessages[existingMessageIndex] = {
                  ...updatedMessages[existingMessageIndex],
                  ...message,
                };
                return {...chat, messages: updatedMessages};
              } else {
                // Add new message
                return {...chat, messages: [...messages, message]};
              }
            }
            return chat;
          }),
        }));
      },
    }),
    {
      name: "chat-store",
    }
  )
);

export const getCurrentChat = () => {
  return useChatStore.getState().chats.find((chat) => chat.id === useChatStore.getState().currentChatId) || null;
};
