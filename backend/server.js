const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection Failed:"));

app.get("/", (req, res) => {
    res.send("Server is running fine!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
