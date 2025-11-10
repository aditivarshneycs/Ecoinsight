# 🌿 EcoInsight – AI Powered Waste Classifier & Eco-Points System

EcoInsight is a full-stack web application that helps users classify waste using AI and promotes sustainability through an Eco-Points reward system. Users can upload images of waste, and the ML model predicts whether the item is **Recyclable, Organic, Hazardous, or Non-Recyclable**. Each classification earns the user **10 Eco Points**, which can later be redeemed for rewards.

---

## 🚀 Features

- ✅ **AI-powered waste classification** (Python + TensorFlow)
- ✅ **User authentication** (Register/Login with JWT)
- ✅ **Image upload & classification** with drag-and-drop support
- ✅ **Automatic 10 Eco Points** added after each upload
- ✅ **Cloudinary integration** for secure cloud image storage
- ✅ **Complete history dashboard** with filters, search, and pagination
- ✅ **Dashboard** with activity history & points tracking
- ✅ **Achievements system** with permanent milestone tracking
- ✅ **Redeem points** for rewards (one-time and repeatable)
- ✅ **MongoDB database** to store users, waste logs, and redemptions
- ✅ **Fully responsive, modern UI** built in React
- ✅ **Professional design** with smooth animations
- ✅ **Toast notifications** for user feedback
- ✅ **Error handling** and loading states

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, Framer Motion, Styled Components, Fetch API |
| **Backend** | Node.js, Express.js, Multer, Axios |
| **Authentication** | JWT + Bcrypt |
| **Database** | MongoDB + Mongoose |
| **ML Service** | Python, Flask, TensorFlow/Keras, NumPy, Pillow |
| **Model Type** | CNN trained on 4-class waste dataset |
| **Storage** | Cloudinary for secure cloud image storage |

---

## 📂 Project Structure

```
eco-insight/
│
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── LoginSignup.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── RedeemPoints.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Awareness.jsx
│   │   │   └── Instructions.jsx
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── Card.jsx
│   │   ├── utils/              # Utilities
│   │   │   └── api.js          # API functions
│   │   └── styles/             # Global styles
│   └── package.json
│
├── backend/                     # Node.js + Express API
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── mlRoutes.js
│   │   ├── wasteRoutes.js
│   │   └── userRoutes.js
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── mlController.js
│   │   ├── wasteController.js
│   │   ├── userController.js
│   │   └── achievementController.js
│   ├── models/                  # Database models
│   │   ├── User.js
│   │   └── Waste.js
│   ├── middleware/              # Middleware
│   │   └── authMiddleware.js
│   ├── config/                  # Configuration
│   │   ├── db.js
│   │   └── cloudinary.js
│   └── server.js
│
└── ml-model/                    # Python ML Service
    ├── app.py                   # Flask Prediction API
    ├── predict.py              # Prediction logic
    ├── waste_classifier_model.h5
    └── requirements.txt
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image storage)

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/eco-insight.git
cd eco-insight
```

### 2. Setup Backend (Node.js)

```bash
cd backend
npm install
```

Create `.env` file in the `backend` directory:

```ini
MONGO_URI=mongodb://127.0.0.1:27017/ecoinsight

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5001

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Note:** Get your Cloudinary credentials from [cloudinary.com](https://cloudinary.com)

Run backend:

```bash
npm run dev
# or
node server.js
```

Should print:
```
✅ EcoInsight Backend running on http://localhost:5001
```

### 3. Setup ML Model (Python)

```bash
cd ml-model
pip install -r requirements.txt
python app.py
```

Should print:
```
 * Running on http://127.0.0.1:5000
```

### 4. Setup Frontend (React)

```bash
cd frontend
npm install
npm start
```

App runs on: `http://localhost:3000`

---

## 🔁 System Flow

```
User Uploads Image
    ↓
React Frontend → Backend API (/api/classify)
    ↓
Backend → Flask ML Model (http://localhost:5000)
    ↓
ML Prediction → Backend
    ↓
Backend → Cloudinary (Image Storage)
    ↓
Backend → MongoDB (Save Waste Record + Update User Points)
    ↓
Backend → Check Achievements
    ↓
React Dashboard Updates (Points + History + Achievements)
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/classify` | Upload image & get ML classification | Yes |
| GET | `/api/waste/history` | Fetch user's classification history | Yes |
| GET | `/api/user/points` | Fetch user's eco points | Yes |
| GET | `/api/user/profile` | Fetch user profile with redemptions | Yes |
| POST | `/api/user/redeem` | Redeem points for rewards | Yes |
| GET | `/api/user/achievements` | Fetch user achievements | Yes |

**Note:** All protected routes require a JWT token in the Authorization header: `Bearer <token>`

---

## 🏆 Eco-Points & Rewards System

| Action | Points | Description |
|--------|--------|-------------|
| Upload & classify waste image | **+10 points** | Automatic after successful classification |
| Points stored in MongoDB | ✅ | Persistent across sessions |
| Points visible in Dashboard | ✅ | Real-time updates |
| Points visible in Profile | ✅ | Complete user stats |
| Redeem for rewards | ✅ | One-time and repeatable rewards available |

### Achievement System

Achievements are **permanent** once unlocked and based on milestones:
- 🌱 First Steps - Upload first image
- 📸 Dedicated Classifier - Upload 10 images
- ⭐ Eco Starter - Earn 50 total points
- 🌟 Eco Enthusiast - Earn 100 total points
- 🏆 Eco Champion - Earn 500 total points
- ♻️ Recycling Pro - Classify 10 recyclable items
- 🌿 Compost King - Classify 10 organic items

---

## 🎨 Features in Detail

### Upload Page
- Drag-and-drop file upload
- Image preview and validation
- Progress indicator
- Real-time classification results
- Achievement notifications
- Toast notifications for feedback

### History Page
- Grid/list view of all classifications
- Filter by category (Recyclable, Organic, Hazardous, Non-Recyclable)
- Search by waste type or description
- Sort by newest/oldest
- Pagination (12 items per page)
- Thumbnail images with metadata

### Profile Page
- User statistics and overview
- Recent activity summary
- Achievements display
- Redeemed rewards history
- Quick action links

### Redeem Page
- Available rewards with costs
- One-time vs repeatable rewards
- Visual indicators for redeemed items
- Points balance display

---

## 🛠️ Development

### Running in Development Mode

1. Start MongoDB (if using local):
```bash
mongod
```

2. Start ML Service:
```bash
cd ml-model
python app.py
```

3. Start Backend:
```bash
cd backend
npm run dev
```

4. Start Frontend:
```bash
cd frontend
npm start
```

---

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
- Set environment variables in deployment platform
- Ensure MongoDB Atlas connection string is set
- Cloudinary credentials must be configured

### Frontend Deployment (Vercel/Netlify)
- Set `REACT_APP_API_URL` environment variable
- Build command: `npm run build`
- Deploy the `build` folder

### ML Service Deployment
- Can be deployed on HuggingFace Spaces, Render, or Railway
- Update backend ML service URL in production

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature X"`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

---

## 📜 License

MIT License © 2025 – EcoInsight Team

---

## 🌍 Made with ♻️ for a cleaner planet

**"Small actions make a big difference."**

Built with ❤️ by the EcoInsight Team 🌱
