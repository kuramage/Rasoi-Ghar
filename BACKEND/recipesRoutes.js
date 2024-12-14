import { Router } from "npm:express";
import { createClient } from "npm:@supabase/supabase-js";
import { v4 as uuidv4 } from "npm:uuid";

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

// Route to fetch all recipes
router.get("/", async (req, res) => {
    try {
        // Fetch specific fields from the Recipe table
        const { data, error } = await supabase
            .from("Recipe")
            .select("userId, recipeName, recipeLikes, recipeImages, recipeDescription");

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

// Route to fetch all recipes
router.get("/", async (req, res) => {
    try {
        // Fetch all recipes from the Supabase table
        const { data, error } = await supabase.from("Recipe").select("*");

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

// Route to fetch a specific recipe by recipeId
router.get("/:recipeId", async (req, res) => {
    const { recipeId } = req.params;

    try {
        // Fetch the specific recipe
        const { data, error } = await supabase
            .from("Recipe")
            .select("*")
            .eq("recipeId", recipeId)
            .single();

        if (error) {
            console.error("Error fetching recipe:", error.message);
            return errorResponse(res, 404, "Recipe not found.");
        }

        return successResponse(res, "Recipe fetched successfully!", data);
    } catch (err) {
        console.error("Error during fetching recipe:", err.message);
        return errorResponse(res, 500, "Internal server error.");
    }
});

// Route to like or dislike a recipe
router.post("/:recipeId/like", async (req, res) => {
    const { recipeId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        console.error("User ID is missing in the request.");
        return errorResponse(res, 400, "User ID is required to like or dislike a recipe.");
    }

    try {
        console.log(`Fetching current recipeLikes for recipeId: ${recipeId}`);

        // Fetch the current recipeLikes array
        const { data: recipe, error: fetchError } = await supabase
            .from("Recipe")
            .select("recipeLikes")
            .eq("recipeId", recipeId)
            .single();

        if (fetchError) {
            console.error("Error fetching recipeLikes:", fetchError.message);
            return errorResponse(res, 404, "Recipe not found.");
        }

        const currentLikes = recipe.recipeLikes || [];
        console.log("Current recipeLikes:", currentLikes);

        let updatedLikes;
        let message;

        // Check if userId is already in the array
        if (currentLikes.includes(userId)) {
            // If userId exists, remove it to "dislike" the recipe
            updatedLikes = currentLikes.filter((id) => id !== userId);
            message = "Recipe disliked successfully!";
        } else {
            // If userId does not exist, add it to "like" the recipe
            updatedLikes = [...currentLikes, userId];
            message = "Recipe liked successfully!";
        }

        console.log("Updated recipeLikes:", updatedLikes);

        // Update the recipeLikes column in the database
        const { data: updatedRecipe, error: updateError } = await supabase
            .from("Recipe")
            .update({ recipeLikes: updatedLikes })
            .eq("recipeId", recipeId)
            .select("recipeLikes")
            .single();

        if (updateError) {
            console.error("Error updating recipeLikes:", updateError.message);
            return errorResponse(res, 500, "Failed to update recipeLikes.");
        }

        console.log("Successfully updated recipeLikes:", updatedRecipe.recipeLikes);
        return successResponse(res, message, { recipeId, recipeLikes: updatedRecipe.recipeLikes });
    } catch (err) {
        console.error("Error during like/dislike operation:", err.message);
        return errorResponse(res, 500, "Internal server error.");
    }
});

export default router;
