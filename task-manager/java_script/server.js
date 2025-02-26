require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const userRoutes = require("./routes/autoRoutes");












const app = express();



app.use(express.json());
app.use(cors());
app.use(userRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});



app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Signup.html"));
});

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Signin.html"));
});


// קריאה נכונה של משתנה הסביבה
const mongoURI = process.env.mongoURI;
if (!mongoURI) {
    throw new Error("❌ שגיאה: MONGO_URI אינו מוגדר בקובץ .env");
}

// התחברות ל-MongoDB
mongoose.connect(mongoURI, {})
    .then(() => console.log("✅ התחברת בהצלחה ל-MongoDB"))
    .catch(err => console.error("❌ שגיאה בחיבור ל-MongoDB:", err));

const db = mongoose.connection;

// יצירת ראוט לבדיקה
app.get("/", (req, res) => {
    res.send("🎉 השרת מחובר ועובד!");
});

// הפעלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
