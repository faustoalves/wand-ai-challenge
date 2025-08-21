export interface IMessage {
  origin: "user" | "agent"; // user or agent
  agentId?: string; // id of the agent that generated the message
  status?: "pending" | "running" | "completed" | "error"; // status of the message
  message?: string; // message content
  delay: number; // delay in milliseconds to send message
  disconnect?: boolean; // whether the message is a disconnect message
}
