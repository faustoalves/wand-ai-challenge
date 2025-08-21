"use client";

import ChatContainer from "@/components/Chat/ChatContainer/ChatContainer";
import {useChatStore} from "@/stores/chatStore";
import {use, useEffect} from "react";

type PageProps = {
  params: Promise<{id: string}>;
};

const Page = (props: PageProps) => {
  const {id} = use(props.params);
  const {setCurrentChat} = useChatStore();

  useEffect(() => {
    setCurrentChat(id);
  }, [id, setCurrentChat]);

  return (
    <div className="h-full">
      <ChatContainer id={id} />
    </div>
  );
};

export default Page;
