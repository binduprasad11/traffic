# Mysuru Traffic Info Website

## 📦 Project Structure
- `frontend/`: React.js client showing Mysuru map with traffic info.
- `backend/`: Express.js server handling admin operations.
- `firebase/`: Firestore database for storing roads and traffic info.

## 🚀 Setup Instructions

### 1. Firebase Setup
- Create a Firebase project.
- Enable Firestore database.
- Download serviceAccountKey.json and place it in backend/.
- Update `frontend/src/firebase.js` with your Firebase config.

### 2. Backend Setup
```bash
cd backend
npm install
node index.js
```
Runs server on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Runs client on `http://localhost:3000`

### 🌟 Usage
- `/` shows the public Mysuru traffic map.
- `/admin` for admin management (future feature).

---

Made for Mysuru citizens! 🚦🚗
