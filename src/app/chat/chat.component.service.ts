import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Chat, IChat, IUser} from "./chat.model";
import {WebsocketService} from "../services/websocketService.service";


const USER_KEY = "p_users"
const CHAT_KEY = "p_chats"

@Injectable({
  providedIn: 'root',
})
export class ChatComponentService {
  // chatMessages: Subject<any>;

  messages: IChat[] = [];
  users: IUser[] =[];

  constructor(private wsService: WebsocketService) {

    // this.chatMessages = <Subject<any>>wsService
    //   .connect()
    //   .map((response: any): any => {
    //     return response;
    //   })


    const users = localStorage.getItem(USER_KEY)
    if (users !== null) {
      this.users = JSON.parse(users);
    }
    const uChats = localStorage.getItem(CHAT_KEY)
    if(uChats !== null) {
      this.messages = JSON.parse(uChats);
    }
    console.log(this.users)
  }


  getMessages(user1: IUser, user2?: IUser): IChat[] {
    console.log(user1, user2, this.messages);
    return this.messages.filter(m => {
      return m.sender.email === user1.email && m.receiver?.email === user2?.email || m.receiver?.email === user1.email && m.sender.email === user2?.email
    });
  }

  sendMessage(message: IChat): void {
    this.messages.push(message);
    localStorage.setItem(CHAT_KEY, JSON.stringify(this.messages))
  }
  getUser(): IUser[] {
    return this.users;
  }
  addUser(user: IUser) {
    this.users.push(user);
    localStorage.setItem(USER_KEY, JSON.stringify(this.users));
  }

}
