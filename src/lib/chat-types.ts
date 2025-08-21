import {IMessage} from "./messages-types";

export interface IChat {
  id: string;
  name: string;
  messages: IMessage[];
}
