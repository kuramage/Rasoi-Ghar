import express from "npm:express";
import cors from "npm:cors";
import dotenv from "npm:dotenv"; // For environment variables
import authRoutes from "./authRoutes.js"; // Import auth routes
import recipesRoutes from "./recipesRoutes.js"; // Import recipes routes
import ingredientRoutes from "./ingredientRoutes.js"; // Import ingredient routes
import stepsVideosRouter from "./stepsVideosRoutes.js"; // Import videos routes
import recipeImagesRouter from "./recipeImagesRoutes.js"; // Import image routes
import userRoutes from "./userRoutes.js"; // Import user routes

// Load environment variables
dotenv.config();

const app = express();
const port = Deno.env.get("PORT") || 5000;

app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:5173","https://rasoi-ghar.onrender.com"]
}));

app.use(express.json());

// Use the auth routes
app.use("/auth", authRoutes);

// Use the recipes routes
app.use("/recipes", recipesRoutes);

// Use the ingredient routes
app.use("/ingredients", ingredientRoutes);

// Use the video routes
app.use("/stepsVideos", stepsVideosRouter);

// Use the image routes
app.use("/recipeImages", recipeImagesRouter);

// Use the user routes
app.use("/user", userRoutes);  // Add this line to use user routes

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
