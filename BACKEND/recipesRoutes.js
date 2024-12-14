// recipesRoutes.js

import dotenv from "npm:dotenv";
dotenv.config(); // Load environment variables

import { Router } from 'npm:express';
import { createClient } from "npm:@supabase/supabase-js";

// Initialize Supabase client using environment variables
const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY")
);

const router = Router();

// Utility function to handle success responses
const successResponse = (res, message, data = {}) => {
    res.status(200).json({ message, data });
};

// Utility function to handle error responses
const errorResponse = (res, status, message) => {
    res.status(status).json({ message });
};

// Route to add a recipe
router.post("/", async (req, res) => {
    const { recipeName, videoLinks, tags, ingredients, userId } = req.body;

    // Validate input
    if (!recipeName || !Array.isArray(videoLinks) || !Array.isArray(tags) || !Array.isArray(ingredients) || !userId) {
        return errorResponse(res, 400, "Invalid input. Please provide all required fields.");
    }

    try {
        // Insert recipe data into the Supabase table
        const { data, error } = await supabase.from("recipes").insert([
            {
                recipe_name: recipeName,
                video_links: videoLinks,
                tags: tags,
                ingredients: ingredients,
                user_id: userId,
            },
        ]);

        if (error) {
            console.error("Error inserting recipe:", error.message);
            return errorResponse(res, 500, "Failed to add recipe.");
        }

        return successResponse(res, "Recipe added successfully!", data);
    } catch (err) {
        console.error("Error during recipe creation:", err.message);
        return errorResponse(res, 500, "Internal server error.");
    }
});

// Route to fetch all recipes
router.get("/", async (req, res) => {
    try {
        // Fetch all recipes from the Supabase table
        const { data, error } = await supabase.from("recipes").select("*");

        if (error) {
            console.error("Error fetching recipes:", error.message);
            return errorResponse(res, 500, "Failed to fetch recipes.");
        }

        if (data.length === 0) {
            return successResponse(res, "No recipes found.", []);
        }

        return successResponse(res, "Recipes fetched successfully!", data);
    } catch (err) {
        console.error("Error during fetching recipes:", err.message);
        return errorResponse(res, 500, "Internal server error.");
    }
});

export default router;
