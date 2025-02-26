const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://ortalb352:orya2025@cluster1.8zbfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// התחברות למסד הנתונים
mongoose.connect(mongoURI)
    .then(() => console.log("✅ התחברת בהצלחה ל-MongoDB"))
    .catch(err => console.error("❌ שגיאה בחיבור ל-MongoDB:", err));


module.exports = mongoose;
    