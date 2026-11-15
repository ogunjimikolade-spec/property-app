// "use server";
// import connectDB from "@/config/database";
// import Message from "@/models/Message";
// import Property from "@/models/Property";
// import { getSessionUser } from "@/utils/getSessionUser";

// async function addMessage(previousState, formData) {
//   await connectDB();

//   const sessionUser = await getSessionUser();

//   if (!sessionUser || !sessionUser.userId) {
//     return { error: "You must be logged in to send a message" };
//   }

//   const { userId } = sessionUser;

//   const recipient = formData.get("recipient");

//   if (userId === recipient) {
//     return { error: "You can not send a message to yourself" };
//   }

//   const newMessage = new Message({
//     sender: userId,
//     recipient,
//     property: formData.get("property"),
//     name: formData.get("name"),
//     email: formData.get("email"),
//     phone: formData.get("phone"),
//     body: formData.get("message"),
//   });

//   await newMessage.save();

//   return { submitted: true };
// }

// export default addMessage;


"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: "You must be logged in to send a message" };
  }

  const { userId } = sessionUser;

  const propertyId = formData.get("property");
  const property = await Property.findById(propertyId);

  if (!property) {
    return { error: "Property not found" };
  }

  // Owner fit be ObjectId or object — handle both
  const recipient =
    typeof property.owner === "object"
      ? property.owner._id.toString()
      : property.owner.toString();

  if (userId === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: propertyId,
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
