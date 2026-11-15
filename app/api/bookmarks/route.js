import connectToDB from "@/utils/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/database";

export const dynamic = "force-dynamic";
export const POST = async (requet) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID required", { status: 401 });
    }
    const { userId } = sessionUser;
    const isBookmarked = User.bookmarks.includes(propertyId);
    return new Response(JSON.stringify({ isBookmarked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
