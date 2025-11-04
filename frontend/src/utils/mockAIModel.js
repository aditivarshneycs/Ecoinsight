// src/utils/mockAIModel.js
export const mockAIModel = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const types = ["Recyclable", "Organic", "Hazardous"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const confidence = Math.floor(70 + Math.random() * 30); // 70–100%
      resolve({ type: randomType, confidence });
    }, 2000);
  });
};
