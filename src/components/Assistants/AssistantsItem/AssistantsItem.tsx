import {IChat} from "@/lib/chat-types";
import {useChatStore} from "@/stores/chatStore";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {useState} from "react";

const AssistantsItem = (chat: IChat) => {
  const router = useRouter();
  const {deleteChat, setCurrentChat} = useChatStore();
  const [isConfirming, setIsConfirming] = useState(false);

  const handlerDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    setIsConfirming(false);
  };

  const handlerSetCurrentChat = (chatId: string) => {
    setCurrentChat(chatId);
    router.push(`/assistants/${chatId}`);
  };

  return (
    <div className="relative h-auto">
      <div className="flex flex-row gap-2 items-center">
        <p
          className="line-clamp-1 cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => handlerSetCurrentChat(chat.id)}
        >
          {chat.name}
        </p>
        <motion.button
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-100 transition-colors"
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.95}}
          onClick={() => setIsConfirming(true)}
        >
          x
        </motion.button>
      </div>
      <AnimatePresence>
        {isConfirming && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className=" mt-1 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2 z-10"
          >
            <p className="text-sm text-gray-600">Delete this chat?</p>
            <div className="flex gap-2">
              <motion.button
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => handlerDeleteChat(chat.id)}
              >
                Delete
              </motion.button>
              <motion.button
                className="px-3 py-1 bg-gray-500 rounded-md text-sm"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => setIsConfirming(false)}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssistantsItem;
