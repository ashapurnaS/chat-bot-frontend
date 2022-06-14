export interface IChat {
  message: string,
  sender: IUser,
  receiver: IUser | undefined
}

export interface IUser {
  name: string,
  email: string
  //userID
}

export class User implements IUser{
  constructor(
    public name: string,
    public email: string
  ) {
  }
}

export class Chat implements IChat{
  constructor(
    public message: string,
    public sender: IUser,
    public receiver: IUser | undefined
  ) {
  }
}
