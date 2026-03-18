import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    title:       { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
    date:        { type: String, required: true },
    month:       { type: String, required: true, maxlength: 3 },
    location:    { type: String, trim: true },
    href:        { type: String, default: "" },
    page: {
      type: String,
      required: true,
      enum: ["makerspace", "artcafe", "cowork", "podlab","roof","loft"], // whitelist
    },
  },
  {
    timestamps: true, // auto adds createdAt + updatedAt
  }
);

// Prevent model recompilation in Next.js dev (hot reload issue)
const Event = models.Event ?? model("Event", EventSchema);

export default Event;