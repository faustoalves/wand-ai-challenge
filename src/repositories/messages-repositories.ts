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
    origin: "system",
    message: "Might take a while, please wait...",
    delay: 300,
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
    delay: 2000,
  },
  {
    origin: "agent",
    agentId: "2",
    status: "completed",
    delay: 1000,
  },
  {
    origin: "agent",
    agentId: "3",
    status: "completed",
    delay: 2000,
  },
  {
    origin: "agent",
    agentId: "4",
    status: "running",
    delay: 1000,
  },
  {
    origin: "agent",
    agentId: "4",
    status: "completed",
    delay: 1000,
  },
  {
    origin: "system",
    message: "I will start by fetching the Microsoft stock price from Yahoo Finance over the last year.",
    delay: 1000,
  },
  {
    origin: "system",
    message:
      "AThen, I will search for today’s market cap of Microsoft on Google. After that, I will create a yearly graph of the market cap based on the stock price changes and email it to you. ",
    delay: 2000,
  },
  {origin: "system", message: "Let’s begin with fetching the stock price data.", delay: 1000},
  {
    origin: "system",
    message: "I have already created the graph with the market cap information. Here it is again for your reference:",
    delay: 1000,
  },
  {origin: "image", message: "/msft_market_cap.png", delay: 0, disconnect: true},
];
