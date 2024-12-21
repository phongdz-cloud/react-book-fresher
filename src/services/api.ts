import axios from "services/axios.customize";

export const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password });
};

export const registerAPI = (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  const urlBackend = "/api/v1/user/register";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullName,
    email,
    password,
    phone,
  });
};

export const fetchAccountAPI = () => {
  const urlBackend = "/api/v1/auth/account";
  //   return axios.get<IBackendRes<IFetchAccount>>(urlBackend, {
  //     headers: {
  //       Delay: 3000,
  //     },
  //   });
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend);
};

export const logoutAPI = () => {
  const urlBackend = "/api/v1/auth/logout";
  return axios.post<IBackendRes<ILogin>>(urlBackend);
};

export const getUsersAPI = (
  current: number,
  pageSize: number,
  query: string,
  sort: string
) => {
  const urlBackend =
    `/api/v1/user?current=${current}&pageSize=${pageSize}` + query + sort;
  return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend);
};

export const createUsersAPI = (
  fullName: string,
  password: string,
  email: string,
  phone: string
) => {
  const urlBackend = "/api/v1/user";
  return axios.post<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend, {
    fullName,
    password,
    email,
    phone,
  });
};

export const updateUsersAPI = (
  _id: string,
  fullName: string,
  phone: string
) => {
  const urlBackend = "/api/v1/user";
  return axios.put<IBackendRes<IUserTable>>(urlBackend, {
    _id,
    fullName,
    phone,
  });
};

export const deleteUsersAPI = (_id: string) => {
  const urlBackend = `/api/v1/user/${_id}`;
  return axios.delete<IBackendRes<IUserTable>>(urlBackend);
};

export const bulkCreateUsersAPI = (users: IBulkCreateUserRequest[]) => {
  const urlBackend = "/api/v1/user/bulk-create";
  return axios.post<IBackendRes<IBulkCreateUserResponse>>(urlBackend, users);
};

export const getBooksAPI = (
  current: number,
  pageSize: number,
  query: string,
  sort: string
) => {
  const urlBackend =
    `/api/v1/book?current=${current}&pageSize=${pageSize}` + query + sort;
  return axios.get<IBackendRes<IModelPaginate<IBookTable>>>(urlBackend);
};
