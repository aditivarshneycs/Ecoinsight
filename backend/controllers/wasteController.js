import Waste from "../models/Waste.js";

export const uploadWaste = async (req, res) => {
  try {
    const userId = req.user; // From auth middleware
    const { wasteType, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required." });
    }

    const waste = new Waste({
      userId,
      wasteType,
      description,
      imageUrl,
    });

    await waste.save();
    res.status(201).json({ message: "Waste uploaded successfully!", waste });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const userId = req.user; // From auth middleware
    const history = await Waste.find({ userId }).sort({ uploadedAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};