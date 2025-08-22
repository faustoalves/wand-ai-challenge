"use client";
import ChatContainer from "@/components/Chat/ChatContainer/ChatContainer";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/assistants");
  }, [router]);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ChatContainer id="1" />
      </main>
    </div>
  );
}
