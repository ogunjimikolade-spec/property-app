import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = await params;
    const property = await Property.findById(id).lean();
    if (!property) {
        return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
  return new Response("something went wrong", { status: 400 });
  }
};
