// utils/classifier.js
export function classifyWaste(imageFile) {
  const fileName = imageFile.name.toLowerCase();
  const keywords = {
    recyclable: ["plastic", "bottle", "metal", "can", "paper", "glass", "carton", "tin"],
    organic: ["food", "fruit", "leaf", "leaves", "banana", "vegetable", "waste"],
    hazardous: ["battery", "paint", "chemical", "medicine", "e-waste", "toxic"],
  };

  // Simple keyword matching
  if (keywords.recyclable.some(word => fileName.includes(word))) {
    return { type: "Recyclable Waste", color: "#3B82F6", bin: "Blue Bin", tips: [
      "Clean and dry the material before recycling.",
      "Separate plastics, paper, and metal items.",
      "Drop it in the nearest blue recycling bin."
    ]};
  }
  if (keywords.organic.some(word => fileName.includes(word))) {
    return { type: "Organic Waste", color: "#22C55E", bin: "Green Bin", tips: [
      "Collect food scraps and compost them.",
      "Avoid mixing with plastic or metal waste.",
      "Throw it in the green bin."
    ]};
  }
  if (keywords.hazardous.some(word => fileName.includes(word))) {
    return { type: "Hazardous Waste", color: "#EF4444", bin: "Red Bin", tips: [
      "Keep it sealed in a separate bag.",
      "Do not mix with normal waste.",
      "Dispose of it at a hazardous waste collection center."
    ]};
  }

  // Fallback random choice if no keyword matches
  const randomTypes = ["Recyclable Waste", "Organic Waste", "Hazardous Waste"];
  const randomPick = randomTypes[Math.floor(Math.random() * 3)];
  const fallbackMap = {
    "Recyclable Waste": { color: "#3B82F6", bin: "Blue Bin" },
    "Organic Waste": { color: "#22C55E", bin: "Green Bin" },
    "Hazardous Waste": { color: "#EF4444", bin: "Red Bin" },
  };

  return {
    type: randomPick,
    color: fallbackMap[randomPick].color,
    bin: fallbackMap[randomPick].bin,
    tips: ["Please verify the waste type before disposal."]
  };
}
