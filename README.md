♻️ EcoInsight – AI Powered Waste Classifier & Eco-Points System

EcoInsight is a full-stack web application that helps users classify waste using AI and promotes sustainability through an Eco-Points reward system.  
Users can upload images of waste, and the ML model predicts whether the item is **Recyclable, Organic, Hazardous, or Non-Recyclable**.  
Each classification earns the user **10 Eco Points**, which can later be redeemed for rewards.

---

## 🚀 Features

✅ AI-powered waste classification (Python + TensorFlow)  
✅ User authentication (Register/Login)  
✅ Upload waste image & receive classification result  
✅ ML-based confidence score  
✅ Eco Points added automatically after each upload  
✅ Dashboard with activity history & points tracking  
✅ MongoDB database to store users + waste logs  
✅ Fully responsive UI built in React  
✅ Image preview & real-time UI update  
✅ Error handling if backend/ML server is offline  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React + Framer Motion + Fetch API |
| **Backend** | Node.js, Express.js, Multer, Axios |
| **Authentication** | JWT + Bcrypt |
| **Database** | MongoDB + Mongoose |
| **ML Service** | Python, Flask, TensorFlow/Keras, NumPy, Pillow |
| **Model Type** | CNN trained on 4-class waste dataset |
| **Storage** | Local `/uploads` folder (can be switched to Cloudinary/S3) |

---

## 📂 Folder Structure

eco-insight/
│
├── frontend/ # React UI
│ ├── src/pages/ # Upload, Dashboard, Auth Screens
│ ├── src/components/
│ └── package.json
│
├── backend/ # Node.js + Express API
│ ├── routes/ # authRoutes.js, mlRoutes.js, wasteRoutes.js
│ ├── controllers/
│ ├── models/ # User.js, Waste.js
│ ├── uploads/ # Saved image files
│ └── server.js
│
└── ml-model/ # Python ML Service
├── dataset/ # 4 labeled folders: recyclable/organic/etc.
├── train_model.py # Script to train CNN
├── model.pkl # Saved trained model
├── app.py # Flask Prediction API
└── requirements.txt

yaml
Copy code

---

## ⚙️ Installation & Setup

### ✅ 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/eco-insight.git
cd eco-insight
✅ 2. Setup Backend (Node.js)
bash
Copy code
cd backend
npm install
Create .env file:

ini
Copy code
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=5000
Run backend:

bash
Copy code
npm run dev
Should print:

arduino
Copy code
✅ EcoInsight Backend running on http://localhost:5000
✅ 3. Setup ML Model (Python)
bash
Copy code
cd ml-model
pip install -r requirements.txt
python app.py
Should print:

csharp
Copy code
 * Running on http://127.0.0.1:5001
✅ 4. Setup Frontend (React)
bash
Copy code
cd frontend
npm install
npm start
App runs on:

arduino
Copy code
http://localhost:3000
🔁 Full System Flow
kotlin
Copy code
React Upload → Backend API → Flask ML Model → Prediction →
Backend stores data + adds EcoPoints → React Dashboard updates
🧪 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
POST	/api/classify	Upload image & get ML result
GET	/api/waste/history/:userId	Fetch classified waste history
GET	/api/user/points/:userId	Fetch eco points

🏆 Eco-Points Logic
Action	Points
Upload & classify waste image	+10 points
Dashboard auto-updates	✅
Stored in MongoDB	✅

🖼️ Screenshots (Add later)
cpp
Copy code
✅ Login / Signup
✅ Upload Page
✅ ML Result Page
✅ Dashboard (Points + History)
✅ Redeem Page (optional)
🛠️ Future Improvements
🔹 Add leaderboard (Top eco users)
🔹 Add cloud storage for uploaded images (Cloudinary, S3)
🔹 Add QR-based recycle bins for real-world use
🔹 Allow redeeming points for vouchers/gifts
🔹 Deploy backend (Render), ML (HuggingFace Spaces), frontend (Vercel)

🤝 Contributing
Fork repo

Create new branch: git checkout -b feature-name

Commit changes: git commit -m "Added feature X"

Push branch: git push origin feature-name

Create Pull Request ✅

📜 License
MIT License © 2025 – EcoInsight Team

🌍 Made with ♻️ for a cleaner planet
“Small actions make a big difference.”
Built by Aditi Varshney & Team 🌱

yaml
Copy code

---

## ✅ NEXT STEP

Want me to also generate:

✔ GitHub repo description + tags  
✔ Project demo GIF preview banner  
✔ `CONTRIBUTING.md` file  
✔ Deploy instructions (Render + Vercel + HuggingFace)

Just reply:

> **"add deploy section"**  
or  
> **"add contributing file"**