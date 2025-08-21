"use client";

import {IMessage} from "@/lib/messages-types";
import {useCallback, useEffect, useRef, useState} from "react";

interface UseMessagesOptions {
  onMessage?: (message: IMessage) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useMessage = (options: UseMessagesOptions = {}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback(() => {
    try {
      // Clean up existing connection if any
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = undefined;
      }

      setError(null);
      const eventSource = new EventSource("/api/messages");
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsConnected(true);
        setError(null);
        optionsRef.current.onOpen?.();
      };

      eventSource.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as IMessage;
          setMessages((prev) => [...prev, message]);
          optionsRef.current.onMessage?.(message);
        } catch (err) {
          console.error("Error parsing message:", err);
        }
      };

      eventSource.onerror = (event) => {
        setIsConnected(false);
        const errorMessage = event instanceof ErrorEvent ? event.message : "Connection error";
        setError(errorMessage);
        optionsRef.current.onError?.(event);

        // Close the errored connection
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create connection");
    }
  }, []);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }
    setIsConnected(false);
    optionsRef.current.onClose?.();
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isConnected,
    error,
    disconnect,
    connect,
    clearMessages,
  };
};
