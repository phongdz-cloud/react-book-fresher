export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    results: T[];
  }

  interface ILogin {
    access_token: string;
    user: IUser;
  }

  interface IRegister {
    email: string;
    fullName: string;
    _id: string;
  }

  interface IUser {
    email: string;
    phone: string;
    fullName: string;
    role: string;
    avatar: string;
    id: string;
    role: string;
  }

  interface IFetchAccount {
    user: IUser;
  }
}
