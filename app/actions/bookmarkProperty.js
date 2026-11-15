"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return { error: "User ID is required" };
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookmarked = user.bookmarks.includes(propertyId);

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    await user.save();
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    await user.save();
    isBookmarked = true;
  }
  revalidatePath("/properties/saved", "page");
  return {
    message: isBookmarked ? "Bookmarked Successfully" : "Bookmark Removed",
    isBookmarked,
  };
}

export default bookmarkProperty;
