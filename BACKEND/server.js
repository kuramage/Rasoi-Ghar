// server.js

import express from "npm:express";
import cors from "npm:cors";
import dotenv from "npm:dotenv"; // For environment variables
import authRoutes from './authRoutes.js';  // Import auth routes
import recipesRoutes from './recipesRoutes.js';  // Import recipes routes
import ingredientRoutes from './ingredientRoutes.js'; // Import ingredient routes

// Load environment variables
dotenv.config();


// Create an instance of express
const app = express();
const port = Deno.env.get("PORT") || 5000;

// Enable CORS with a specific origin (replace with your frontend's URL)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Use the auth routes
app.use("/auth", authRoutes);

// Use the recipes routes
app.use("/recipes", recipesRoutes);

// Use the ingredient routes
app.use("/ingredients", ingredientRoutes);

// 404 Route Handling
app.use((req, res) => {
    res.status(404).json({ message: "Route not found." });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ message: "Internal server error." });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
