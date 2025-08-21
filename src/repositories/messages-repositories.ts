import {IMessage} from "@/lib/messages-types";

export const MessagesRepo: IMessage[] = [
  {
    origin: "system",
    message: "Wait a minute, finding the best agent for this task...",
    delay: 500,
  },
  {
    origin: "agent",
    agentId: "1",
    status: "pending",
    delay: 500,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "pending",
    delay: 200,
  },
  {
    origin: "agent",
    agentId: "1",
    status: "running",
    delay: 100,
  },
  {
    origin: "agent",
    agentId: "3",
    status: "pending",
    delay: 200,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "running",
    delay: 400,
  },
  {
    origin: "agent",
    agentId: "1",
    status: "completed",
    delay: 400,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "running",
    delay: 400,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "completed",
    delay: 400,
  },
  {
    origin: "agent",
    agentId: "3",
    status: "completed",
    delay: 400,
  },
  {origin: "system", message: "AI Agent Response 01", delay: 100},
  {origin: "system", message: "AI Agent Response 02", delay: 100},
  {origin: "system", message: "AI Agent Response 03", delay: 100},
  {origin: "system", message: "End of conversation", delay: 0, disconnect: true},
];
