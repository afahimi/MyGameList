import { createContext } from "react";

interface LoginContextType {
  loginToken: string;
  setLoginToken: (token: string) => void;
  clearToken: () => void;
}

export const LoginContext = createContext<LoginContextType>({
  loginToken: "",
  setLoginToken: (token: string) => {},
  clearToken: () => {},
});
