import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect } from "react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

const UnreadMessageCount = () => {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {const res = await getUnreadMessageCount();
        setUnreadCount(res.count);
      } catch (error) {
        console.error("Failed to fetch unread message count:", error);
      }
    };

    fetchUnreadCount();
  }, [setUnreadCount]);

  if (unreadCount === 0) {
    return null;
  }

  return (
    <div>{unreadCount}</div>
  );
};

export default UnreadMessageCount;