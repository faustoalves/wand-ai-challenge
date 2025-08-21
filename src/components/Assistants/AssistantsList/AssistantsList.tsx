import {useChatStore} from "@/stores/chatStore";
import {useRouter} from "next/navigation";
import {v4 as uuidv4} from "uuid";
import AssistantsItem from "../AssistantsItem/AssistantsItem";

const AssistantsList = () => {
  const {chats} = useChatStore();
  const router = useRouter();

  const handlerNewChat = () => {
    const newId = uuidv4();
    router.push(`/assistants/${newId}`);
  };

  return (
    <div>
      {chats.map((chat) => (
        <AssistantsItem key={chat.id} {...chat} />
      ))}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            handlerNewChat();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          New Chat
        </button>
      </div>
    </div>
  );
};

export default AssistantsList;
