import { createContext, useState } from "react";

export interface Auth {
  email: string | null,
  accessToken: string | null
}

export const AuthContext:React.Context<{ auth: Auth; setAuth: React.Dispatch<React.SetStateAction<Auth>> }> = createContext({} as any);

export const AuthProvider = ({ children} : {children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>({ email: null, accessToken: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;