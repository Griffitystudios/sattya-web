
import { NextRequest, NextResponse } from "next/server";
import {connectDB }from "../../../lib/mongoose";
import Event from "../../../models/Events";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");

    const query = page ? { page } : {};
    const events = await Event.find(query).sort({ createdAt: -1 });

    return NextResponse.json(events);
  } catch (error) {
    console.error("[GET /api/events]", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("[POST /api/events]", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
