require("dotenv").config();

const express = require("express");
const app = express();

const animalRoutes = require("./routes/animals");

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Animal Management RESTful API is running"
    });
});

app.use("/api/animals", animalRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});