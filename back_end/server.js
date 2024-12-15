// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); // For environment variables
const authRoutes = require("./authRoutes.js"); // Import auth routes
const recipesRoutes = require("./recipesRoutes.js"); // Import recipes routes
const ingredientRoutes = require("./ingredientRoutes.js"); // Import ingredient routes
const stepsVideosRouter = require("./stepsVideosRoutes.js"); // Import videos routes
const recipeImagesRouter = require("./recipeImagesRoutes.js"); // Import image routes
const userRoutes = require("./userRoutes.js"); // Import user routes
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 5000; // Use environment variable for PORT, or fallback to 5000

// Middleware
app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:5173","https://rasoi-ghar.onrender.com"] // Ensure to add your frontend URL
}));

app.use(express.json()); // Parse incoming JSON data

// Define Routes
app.use("/auth", authRoutes); // Handle authentication routes
app.use("/recipes", recipesRoutes); // Handle recipe routes
app.use("/ingredients", ingredientRoutes); // Handle ingredient routes
app.use("/stepsVideos", stepsVideosRouter); // Handle video routes
app.use("/recipeImages", recipeImagesRouter); // Handle image routes
app.use("/user", userRoutes);  // Handle user routes  

// Static file serving for frontend
// Correct the path to the FRONTEND/dist directory located at the root of the project
app.use(express.static(path.join(__dirname, "../FRONTEND/dist")));

// 404 Route Handling
app.use((req, res) => {
    res.status(404).json({ message: "Route not found." });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ message: "Internal server error." });
});

// Catch-all for frontend routing in production (SPA behavior)
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, "../FRONTEND", "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
