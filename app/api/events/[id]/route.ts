import { connectDB } from "../../../../lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Event from "../../../../models/Events";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();

  const updated = await Event.findByIdAndUpdate(
    params.id,
    body,
    { new: true, runValidators: true } // ← runs schema validators on update too
  );

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Event.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}