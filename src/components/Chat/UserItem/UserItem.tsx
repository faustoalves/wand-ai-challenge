import {IMessage} from "@/lib/messages-types";
import {motion} from "motion/react";

const UserItem = (props: IMessage) => {
  return (
    <motion.div
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3, ease: "easeInOut"}}
      className="relative "
    >
      <div className="relative w-auto bg-white/10 rounded-lg rounded-tr-none shadow mx-8 p-3">
        {JSON.stringify(props)}
      </div>
      <div className="absolute h-6 w-6 top-0.5 right-1 rounded-full rounded-tl-none bg-blue-500"></div>
    </motion.div>
  );
};

export default UserItem;
