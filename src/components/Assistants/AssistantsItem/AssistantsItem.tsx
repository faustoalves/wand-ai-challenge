import {IChat} from "@/lib/chat-types";
import {useChatStore} from "@/stores/chatStore";
import {AnimatePresence, motion} from "framer-motion";
import {Trash2} from "lucide-react";
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
      <div className="flex flex-row gap-2 items-center bg-black/30 rounded-sm p-2 text-white font-bold flex justify-between">
        <p
          className="line-clamp-1 cursor-pointer w-full  transition-colors"
          onClick={() => handlerSetCurrentChat(chat.id)}
        >
          {chat.name}
        </p>
        <motion.button
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-100 transition-colors cursor-pointer"
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.95}}
          onClick={() => setIsConfirming(true)}
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
      <AnimatePresence>
        {isConfirming && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className=" mt-1 bg-white shadow-lg rounded-xs p-2 flex flex-col gap-2 z-10"
          >
            <p className="text-sm text-gray-600">Delete this chat?</p>
            <div className="flex gap-2">
              <motion.button
                className="px-3 py-1 bg-pink-600 text-white rounded-md text-sm cursor-pointer"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => handlerDeleteChat(chat.id)}
              >
                Delete
              </motion.button>
              <motion.button
                className="px-3 py-1 bg-purple-800 rounded-md text-sm cursor-pointer text-white"
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
