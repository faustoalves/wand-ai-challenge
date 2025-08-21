import {IMessage} from "@/lib/messages-types";
import {MessagesRepo} from "@/repositories/messages-repositories";
import {NextRequest} from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  let currentMessageIndex = 0;
  const timeStamp = Date.now();
  const stream = new ReadableStream({
    start(controller) {
      let timeoutId: NodeJS.Timeout | null = null;
      let isConnectionClosed = false;
      let cleanupCalled = false;

      // Helper function to send messages
      const sendMessage = (message: IMessage) => {
        if (!isConnectionClosed) {
          try {
            // Ensure all required fields are present
            const messageToSend = {
              ...message,
              origin: message.origin || (message.agentId ? "agent" : "user"),
              timeStamp: timeStamp,
            };
            const data = `data: ${JSON.stringify(messageToSend)}\n\n`;
            controller.enqueue(encoder.encode(data));
          } catch (error) {
            console.error("Error sending message:", error);
            cleanup();
          }
        }
      };

      // Cleanup function
      const cleanup = () => {
        if (cleanupCalled) return;
        cleanupCalled = true;
        isConnectionClosed = true;

        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        try {
          controller.close();
        } catch (error) {
          console.error("Error sending message:", error);
        }
      };

      // Function to schedule next message
      const scheduleNextMessage = () => {
        if (isConnectionClosed || currentMessageIndex >= MessagesRepo.length) {
          cleanup();
          return;
        }

        const currentMessage = MessagesRepo[currentMessageIndex];
        const delay = currentMessage.delay || 2000; // Default to 2 seconds if no delay specified

        timeoutId = setTimeout(() => {
          sendMessage(currentMessage);
          currentMessageIndex++;
          scheduleNextMessage();
        }, delay);
      };

      // Start sending messages
      scheduleNextMessage();

      // Cleanup on connection close
      request.signal.addEventListener("abort", cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
