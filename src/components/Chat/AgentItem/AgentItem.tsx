import {IMessage} from "@/lib/messages-types";
import {AnimatePresence, motion} from "framer-motion";
import {Boxes, ChartArea, Check, CircleX, Crown, Handshake, PauseCircle, RefreshCw, SquareX} from "lucide-react";

interface IAgent {
  id: string;
  name: string;
  description: string;
}

const Agents: IAgent[] = [
  {
    id: "1",
    name: "Agent 1",
    description: "Document Agent",
  },
  {
    id: "2",
    name: "Agent 2",
    description: "Client Insight Agent",
  },
  {
    id: "3",
    name: "Agent 3",
    description: "Risk Intelligence Agent",
  },
  {
    id: "4",
    name: "Agent 4",
    description: "Proposal Assessment Agent",
  },
];

const AgentItem = (props: IMessage) => {
  const agent = Agents.find((agent) => agent.id === props.agentId);
  const bgColor =
    props.status === "running"
      ? "bg-lime-500"
      : props.status === "completed"
      ? "bg-purple-500"
      : props.status === "error"
      ? "bg-red-500"
      : props.status === "pending"
      ? "bg-amber-500"
      : "bg-gray-500";
  const borderColor =
    props.status === "running"
      ? "border-lime-600"
      : props.status === "completed"
      ? "border-purple-600"
      : props.status === "error"
      ? "border-red-600"
      : props.status === "pending"
      ? "border-amber-600"
      : "border-gray-600";
  const textColor =
    props.status === "running"
      ? "text-lime-500"
      : props.status === "completed"
      ? "text-purple-500"
      : props.status === "error"
      ? "text-red-500"
      : props.status === "pending"
      ? "text-amber-500"
      : "text-gray-500";

  return (
    <motion.div
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3, ease: "easeInOut"}}
      className={`relative `}
    >
      <div
        className={`relative w-auto bg-black/30  rounded-lg rounded-tl-none shadow mx-8 flex flex-row justify-between border ${borderColor} overflow-hidden`}
      >
        <div className={`flex flex-col aspect-square w-14 justify-center items-center ${textColor}`}>
          {agent?.id === "1" ? (
            <Crown className="w-8 h-8" strokeWidth={1.5} />
          ) : agent?.id === "2" ? (
            <Boxes className="w-8 h-8" strokeWidth={1.5} />
          ) : agent?.id === "3" ? (
            <ChartArea className="w-8 h-8" strokeWidth={1.5} />
          ) : agent?.id === "4" ? (
            <Handshake className="w-8 h-8" strokeWidth={1.5} />
          ) : (
            <SquareX className="w-8 h-8" strokeWidth={1.5} />
          )}
        </div>
        <div className="flex flex-col ">
          <AnimatePresence mode="wait">
            <motion.div
              key={props.status}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              className={`flex flex-col gap-1 justify-center items-center pt-2 ${textColor}`}
            >
              <p className="text-sm md:text-lg tracking-wide font-bold uppercase ">{agent?.description}</p>
              <span
                className={` text-black/80 text-xs uppercase font-bold rounded-lg rounded-br-none rounded-bl-none  px-4 py-px ${bgColor}`}
              >
                <p className="animate-pulse">
                  {props.status === "running"
                    ? "Processing..."
                    : props.status === "completed"
                    ? "Completed"
                    : props.status === "error"
                    ? "Error"
                    : props.status === "pending"
                    ? "Pending"
                    : "Unknown"}
                </p>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={`flex flex-col aspect-square w-14 justify-center items-center ${textColor}`}>
          {props.status === "running" ? (
            <RefreshCw className="w-6 h-6 animate-spin" strokeWidth={2} />
          ) : props.status === "completed" ? (
            <Check className="w-6 h-6 animate-pulse " strokeWidth={2} />
          ) : props.status === "error" ? (
            <CircleX className="w-6 h-6 animate-pulse" strokeWidth={2} />
          ) : props.status === "pending" ? (
            <PauseCircle className="w-6 h-6 animate-pulse" strokeWidth={2} />
          ) : (
            <SquareX className="w-6 h-6 animate-pulse" strokeWidth={2} />
          )}
        </div>
      </div>
      <div className={`absolute h-6 w-6 top-0.5 left-1 rounded-full rounded-tr-none ${bgColor}`}></div>
    </motion.div>
  );
};

export default AgentItem;
