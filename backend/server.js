const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require('./routers');

const app = express();
const PORT = 3002;

const url = "mongodb+srv://anuda7:Anuda7@cluster0.jjiqy8r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDatabase = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the database");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

connectDatabase();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.db = mongoose.connection.db; // Fixed the typo
    next();
});

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
    console.error("Error starting server:", err);
});
