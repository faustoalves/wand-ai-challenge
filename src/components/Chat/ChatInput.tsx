import {Textarea} from "@/components/ui/textarea";
import {Send} from "lucide-react";
import {useState} from "react";

interface IChatInput {
  onSend: (message: string) => void;
}

const ChatInput = ({onSend}: IChatInput) => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex w-full relative min-h-24">
      <Textarea
        placeholder="Type your message here."
        id="message"
        className="w-full bg-black/30 text-white outline-black border-black relative placeholder:text-white/40 !text-base mx-8"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="absolute flex flex-row items-center justify-center gap-2 bg-pink-500 right-[34px] bottom-[2px] w-22 font-bold h-8 text-white rounded-xs rounded-br-lg cursor-pointer"
        onClick={() => onSend(message)}
      >
        <Send className="w-4 h-4" />
        Send
      </button>
    </div>
  );
};

export default ChatInput;
