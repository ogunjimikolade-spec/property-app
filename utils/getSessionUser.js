import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }
    return {
      userId: session.user.id || session.user._id,
      user: session.user,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
