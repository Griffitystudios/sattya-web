
import { connectDB } from "../../../lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Event from "../../../models/Events";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  const query = page ? { page } : {};
  const events = await Event.find(query).sort({ createdAt: -1 });

  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  // Mongoose validates against the schema automatically
  const event = await Event.create(body);
  return NextResponse.json(event, { status: 201 });
}