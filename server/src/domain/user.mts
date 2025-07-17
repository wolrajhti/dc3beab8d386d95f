export interface IUser {
  _id: string;
  email: string;
  passwordHash: string;
}

export class User {
  public _id: string;
  public email: string;
  public passwordHash: string;
  constructor(data: IUser
  ) {
    this._id = data._id;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
  }
  toJSON(): IUser {
    return {
      _id: this._id,
      email: this.email,
      passwordHash: this.passwordHash
    };
  }
}
