import mongoose from "mongoose";

const wasteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wasteType: {
      type: String,
      required: true,
      enum: ["Organic", "Recyclable", "Non-Recyclable"],
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String, // path to the uploaded image
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Waste", wasteSchema);