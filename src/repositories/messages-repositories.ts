import {IMessage} from "@/lib/messages-types";

export const MessagesRepo: IMessage[] = [
  {
    origin: "system",
    message: "Wait a minute, finding the best agent for this task...",
    delay: 300,
  },
  {
    origin: "agent",
    agentId: "1",
    status: "pending",
    delay: 200,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "pending",
    delay: 1000,
  },
  {
    origin: "agent",
    agentId: "1",
    status: "running",
    delay: 400,
  },
  {
    origin: "agent",
    agentId: "3",
    status: "pending",
    delay: 4000,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "running",
    delay: 1000,
  },
  {
    origin: "agent",
    agentId: "1",
    status: "completed",
    delay: 4000,
  },
  {
    origin: "agent",
    agentId: "4",
    status: "pending",
    delay: 100,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "running",
    delay: 4000,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "completed",
    delay: 4000,
  },
  {
    origin: "agent",
    agentId: "3",
    status: "completed",
    delay: 1000,
  },
  {
    origin: "agent",
    agentId: "4",
    status: "running",
    delay: 2000,
  },
  {
    origin: "agent",
    agentId: "4",
    status: "completed",
    delay: 1000,
  },
  {origin: "system", message: "AI Agent Response 01", delay: 1000},
  {origin: "system", message: "AI Agent Response 02", delay: 1000},
  {origin: "system", message: "AI Agent Response 03", delay: 1000},
  {origin: "system", message: "End of conversation", delay: 0, disconnect: true},
];
