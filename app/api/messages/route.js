import connectDB from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to send a message" }),
        { status: 401 },
      );
    }

    const { userId } = sessionUser;

    // Accept BOTH JSON and FormData — no crash again
    const contentType = request.headers.get("content-type") || "";
    let data = {};

    if (contentType.includes("application/json")) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    }

    const propertyId = data.property;
    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }

    const recipient =
      typeof property.owner === "object"
        ? property.owner._id.toString()
        : property.owner.toString();

    if (userId === recipient) {
      return new Response(
        JSON.stringify({ message: "You can not send a message to yourself" }),
        { status: 400 },
      );
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property: propertyId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message Sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
