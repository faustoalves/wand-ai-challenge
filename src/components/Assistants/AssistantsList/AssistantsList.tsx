import {useChatStore} from "@/stores/chatStore";
import {Menu, Plus, X} from "lucide-react";
import {AnimatePresence, motion} from "motion/react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import AssistantsItem from "../AssistantsItem/AssistantsItem";

const AssistantsList = () => {
  const {chats} = useChatStore();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlerNewChat = () => {
    const newId = uuidv4();
    router.push(`/assistants/${newId}`);
  };

  const handlerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="hidden lg:flex flex-col gap-2 pr-4 w-[240px]">
        <div className="flex flex-col gap-2 mb-8 py-4">
          <button
            onClick={() => {
              handlerNewChat();
            }}
            className="bg-pink-500 flex flex-row items-center justify-center gap-2 text-white px-4 py-2 rounded-sm font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        {chats.length === 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-white">No chats yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold">Last chats</p>
            {chats.map((chat) => (
              <AssistantsItem key={chat.id} {...chat} />
            ))}
          </div>
        )}
      </div>
      <div className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center gap-2 lg:hidden z-10 h-18 bg-purple-900/20  backdrop-blur-3xl">
        <button
          className="text-white cursor-pointer w-16 h-16 justify-center items-center flex"
          onClick={() => {
            handlerMenu();
          }}
        >
          <Menu className="w-8 h-8" strokeWidth={1} />
        </button>
        <button className="text-white w-16 h-16 justify-center items-center flex cursor-pointer">
          <Plus
            className="w-8 h-8"
            strokeWidth={1}
            onClick={() => {
              handlerNewChat();
            }}
          />
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 flex flex-col gap-2 lg:hidden pt-8 bg-purple-900/60 p-4 z-20 backdrop-blur-3xl w-full h-full"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            {chats.length === 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-white">No chats yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-white font-bold">Last chats</p>
                {chats.map((chat) => (
                  <AssistantsItem key={chat.id} {...chat} />
                ))}
              </div>
            )}
            <button className="absolute top-0 right-0 text-white w-16 h-16 justify-center items-center flex cursor-pointer">
              <X
                className="w-8 h-8"
                strokeWidth={1}
                onClick={() => {
                  handlerNewChat();
                }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AssistantsList;
