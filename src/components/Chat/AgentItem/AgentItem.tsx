import {IMessage} from "@/lib/messages-types";
import {AnimatePresence, motion} from "framer-motion";

interface IAgent {
  id: string;
  name: string;
  description: string;
}

const Agents: IAgent[] = [
  {
    id: "1",
    name: "Agent 1",
    description: "Agent 1 description",
  },
  {
    id: "2",
    name: "Agent 2",
    description: "Agent 2 description",
  },
  {
    id: "3",
    name: "Agent 3",
    description: "Agent 3 description",
  },
  {
    id: "4",
    name: "Agent 4",
    description: "Agent 4 description",
  },
];

const AgentItem = (props: IMessage) => {
  const agent = Agents.find((agent) => agent.id === props.agentId);

  return (
    <motion.div
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3, ease: "easeInOut"}}
      className="relative "
    >
      <div className="relative w-auto bg-white/10 rounded-lg rounded-tl-none shadow mx-8 p-3 grid grid-cols-6 ">
        <div className="row-span-2 aspect-square"></div>
        <div className="col-span-5">{agent?.description}</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={props.status}
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 10}}
            transition={{duration: 0.2}}
            className="col-span-5 flex items-center gap-2"
          >
            <motion.div
              className={`h-2 w-2 rounded-full ${
                props.status === "running"
                  ? "bg-yellow-400"
                  : props.status === "completed"
                  ? "bg-green-400"
                  : props.status === "error"
                  ? "bg-red-400"
                  : props.status === "pending"
                  ? "bg-blue-400"
                  : "bg-gray-400"
              }`}
              animate={{
                scale: props.status === "running" ? [1, 1.2, 1] : 1,
              }}
              transition={{
                repeat: props.status === "running" ? Infinity : 0,
                duration: 0.8,
              }}
            />
            <span className="text-sm text-gray-600">
              {props.status === "running"
                ? "Processing..."
                : props.status === "completed"
                ? "Completed"
                : props.status === "error"
                ? "Error"
                : props.status === "pending"
                ? "Pending"
                : "Unknown"}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute h-6 w-6 top-0.5 left-1 rounded-full rounded-tr-none bg-blue-500"></div>
    </motion.div>
  );
};

export default AgentItem;
