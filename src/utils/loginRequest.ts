import {IAccountData} from "../model/AccountDataInterface";
import makeApiRequest from "./makeApiRequest";

export default async ({username, password}: IAccountData, setCookie: any) => {
  const resp = await makeApiRequest('auth', "POST", false, { username, password })
  if (resp.status === 200) {
    setCookie('auth', resp.response.token)
  }

  return resp
}