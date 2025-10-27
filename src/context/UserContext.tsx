"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
}

const UserContext = createContext<{
  user: UserProfile | null;
  setUser: (u: UserProfile | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
