import {IMessage} from "@/lib/messages-types";

const AgentItem = (props: IMessage) => {
  return <div>{JSON.stringify(props)}</div>;
};

export default AgentItem;
