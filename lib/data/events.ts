import { connectDB } from "../../lib/mongoose";
import Event from "../../models/Events";

export async function getEventsByPage(page: string) {
  await connectDB();
  return Event.find({ page }).sort({ createdAt: -1 }).lean(); // .lean() returns plain JS objects
}