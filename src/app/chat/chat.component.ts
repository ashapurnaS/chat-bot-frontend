import { Component, OnInit } from '@angular/core';
import {ChatComponentService} from "./chat.component.service";
import {ActivatedRoute} from "@angular/router";
import {Chat, IChat, IUser, User} from "./chat.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  title = 'chat-bot';
  isAdmin = false;
  isQueryOpen =false;
  isChatOpen = false;
  hasChatStarted = false;
  sender: IUser = new User("", "");
  senderMessage: string = '';
  messages: IChat[] = [];
  users: IUser[] =[];
  selectedUser: IUser | undefined;
  isQueryChatOpen = false;
  admin : IUser = {
    name: 'admin',
    email: 'admin@gmail.com'
  };

  constructor(private appComponentService: ChatComponentService,
              private route: ActivatedRoute,
              private chat: ChatComponentService,

  ) {
    console.log(this.route.data);
    this.route.data.subscribe(data => {
      this.isAdmin = data['isAdmin'];
      console.log(this.isAdmin);
    })
  }

  ngOnInit(): void {
    // this.chat.chatMessages.subscribe(msg => {
    //   console.log(msg);
    // })
    this.users = this.appComponentService.getUser();
  }
  openQuery() {
    this.isQueryOpen = true;
  }
  openModal() {
    this.isChatOpen = true;
  }
  openQueryChat(user: IUser) {
      this.isQueryChatOpen =true;
      this.selectedUser = user;
      this.messages = this.appComponentService.getMessages(this.selectedUser, this.admin);
  }
  closeQueryChat() {
    this.isQueryChatOpen = false;
  }
  closeQuery () {
    this.isQueryOpen =false;
  }
  closeModal() {
    this.isChatOpen = false;
  }

  startChat() {
    console.log(this.sender.name, this.sender.email);
    if(this.sender.name !== "" && this.sender.email !== "") {
      //adding new user to user list

      const user = this.users.find( u => u.email === this.sender.email);
      if(user === undefined) {
        this.appComponentService.addUser(this.sender);
      }
      this.messages = this.appComponentService.getMessages(this.sender, this.admin);
      this.hasChatStarted = true;
    }
  }

  sentMessage() {
    if (this.isAdmin) {
      const chat = new Chat(this.senderMessage, this.admin, this.selectedUser);
      this.appComponentService.sendMessage(chat);
      this.messages = this.appComponentService.getMessages(this.admin, this.selectedUser);
    } else {
      const chat = new Chat(this.senderMessage, this.sender, this.admin);
      this.appComponentService.sendMessage(chat);
      this.messages = this.appComponentService.getMessages(this.sender, this.admin);
    }
    this.senderMessage = "";
  }

  // this.chatMessage.sendMsg("Test Message");

}
