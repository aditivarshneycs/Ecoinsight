import mongoose from "mongoose";

const wasteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    wasteType: {
      type: String,
      enum: ["Recyclable", "Non-Recyclable", "Organic"],
      required: true,
    },
    description: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Waste", wasteSchema);
