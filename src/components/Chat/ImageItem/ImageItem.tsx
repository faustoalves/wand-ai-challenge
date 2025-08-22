import {IMessage} from "@/lib/messages-types";
import {motion} from "motion/react";

const ImageItem = (props: IMessage) => {
  return (
    <motion.div
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3, ease: "easeInOut"}}
      className="relative "
    >
      <div className="relative w-auto bg-black/30 rounded-lg rounded-tl-none shadow mx-8 p-3 justify-end flex flex-col">
        <p className="line-clamp-1 text-purple-400 font-bold text-xs text-left">Wand.ai</p>
        <img src={props.message} alt="image" className="w-full h-auto object-cover" />
      </div>
      <div className="absolute h-6 w-6 top-0.5 left-1 rounded-full rounded-tr-none bg-pink-500"></div>
    </motion.div>
  );
};

export default ImageItem;
