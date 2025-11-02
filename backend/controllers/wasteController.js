import Waste from "../models/Waste.js";

export const uploadWaste = async (req, res) => {
  try {
    const { wasteType, description } = req.body;
    const waste = await Waste.create({
      user: req.user,
      wasteType,
      description,
    });
    res.status(201).json({ message: "Waste data saved successfully", waste });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWasteHistory = async (req, res) => {
  try {
    const wasteData = await Waste.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(wasteData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
