"use server";

import connectDB from "@/config/database";
import cloudinary from  "@/config/cloudinary";
import Property from "@/models/Property";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("You must be logged in");
  }

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property not found");

  // verify owernership
  if (property.owner.toString() !== session.user.id) {
    throw new Error("Unauthorized");
  }
    
  // Delete images from Cloudinary
    const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split("/");
        return parts.at(-1).split(".").at(0); // Extract public ID from URL
  });

  if(publicIds.length > 0){
    for (let publicId of publicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(`Failed to delete image with public ID ${publicId}:`, error);
      }
  }

  await property.deleteOne();

  revalidatePath("profile", "page");
}
}
export default deleteProperty;
