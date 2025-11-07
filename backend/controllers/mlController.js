import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const classifyWaste = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path)); // ✅ matches Flask API param

    const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
      headers: formData.getHeaders(),
    });

    return res.json(response.data); // { prediction: "recyclable" }
  } catch (err) {
    console.error("❌ ML Service Error:", err.message);
    res.status(500).json({ error: "Failed to connect to ML service" });
  }
};
