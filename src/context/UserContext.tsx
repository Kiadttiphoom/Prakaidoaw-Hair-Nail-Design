"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export function UserProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: any;
}) {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
