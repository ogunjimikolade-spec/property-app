"use client";
import { createContext, useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
//  create a context for global state management
const GlobalContext = createContext();

// create a provider component to wrap the app and provide the global state
export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData && sessionData.user?.id) {
      getUnreadMessageCount(sessionData.user.id).then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, sessionData]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
