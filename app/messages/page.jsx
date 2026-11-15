import connectDB from "@/config/database";
import Message from "@/models/Message";
import "@/models/Property";
import MessageCard from "@/component/MessageCard";
import { convertToSerializableObject } from "@/utils/convertObject";
import { getSessionUser } from "@/utils/getSessionUser";;

const MessagesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return <h1 className="text-3xl text-center mt-10">You must be logged in to view messages</h1>;
  }

  const { userId } = sessionUser;

  // 1. This method — Unread first
  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // 2. This method — Read after
  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unread = convertToSerializableObject(unreadMessages);
  const read = convertToSerializableObject(readMessages);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {unread.length === 0 && read.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              <>
                {unread.length > 0 &&
                  unread.map((message) => (
                    <MessageCard key={message._id} message={message} />
                  ))}
                {read.length > 0 &&
                  read.map((message) => (
                    <MessageCard key={message._id} message={message} />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default MessagesPage;
