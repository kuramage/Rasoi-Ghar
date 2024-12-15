const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");

// Initialize Supabase client using environment variables
const supabase = createClient(
    process.env.SUPABASE_URL,    // Accessing SUPABASE_URL from environment variables
    process.env.SUPABASE_ANON_KEY // Accessing SUPABASE_ANON_KEY from environment variables
  );


  const express = require('express');
  const router = express.Router();

// Utility function to handle success responses
const successResponse = (res, message, data = {}) => {
    res.status(200).json({ message, data });
};

// Utility function to handle error responses
const errorResponse = (res, status, message) => {
    res.status(status).json({ message });
};


router.post("/", async (req, res) => {
    const {
        stepsVideos,
        stepsNotes,
        stepsIngredients,
        userId,
        recipeName,
        stepsTitles,
        recipeDescription,
        recipeImages,
    } = req.body;

    // Validate input
    if (
        !recipeName ||
        !Array.isArray(stepsVideos) ||
        !Array.isArray(stepsNotes) ||
        !Array.isArray(stepsTitles) ||
        !userId ||
        !Array.isArray(stepsIngredients) || // Validate it's an array
        !stepsIngredients.every((step) => Array.isArray(step)) || // Validate it's a 2D array
        typeof recipeDescription !== "string" || // Correct field name for validation
        !Array.isArray(recipeImages) // Correct field name for validation
    ) {
        return errorResponse(res, 400, "Invalid input. Please provide all required fields.");
    }

    try {
        // Generate a UUID for recipeId
        const recipeId = uuidv4();

        // Insert recipe data into the Supabase table
        const { data: recipeData, error: recipeError } = await supabase
            .from("Recipe")
            .insert([
                {
                    recipeId,
                    stepsVideos,
                    stepsNotes,
                    stepsIngredients,
                    userId,
                    recipeName,
                    stepsTitles,
                    recipeDescription,
                    recipeImages,
                    recipeLikes: [], // Initialize recipeLikes as an empty array
                },
            ])
            .select();

        if (recipeError) {
            console.error("Error inserting recipe:", recipeError.message);
            return errorResponse(res, 500, "Failed to add recipe.");
        }

        // Fetch the userDetails and update the userRecipes column
        const { data: userData, error: userFetchError } = await supabase
            .from("userDetails")
            .select("userRecipes")
            .eq("userId", userId)
            .single();

        if (userFetchError) {
            console.error("Error fetching userDetails:", userFetchError.message);
            return errorResponse(res, 404, "User not found.");
        }

        const currentRecipes = userData.userRecipes || [];

        // Add the new recipeId to the user's recipes
        const updatedRecipes = [...currentRecipes, recipeId];

        // Update the userRecipes column in the userDetails table
        const { error: userUpdateError } = await supabase
            .from("userDetails")
            .update({ userRecipes: updatedRecipes })
            .eq("userId", userId);

        if (userUpdateError) {
            console.error("Error updating userRecipes:", userUpdateError.message);
            return errorResponse(res, 500, "Failed to update user's recipes.");
        }

        return successResponse(res, "Recipe added successfully and user details updated!", {
            recipe: recipeData[0],
            updatedUserRecipes: updatedRecipes,
        });
    } catch (err) {
        console.error("Error during recipe creation:", err.message);
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
module.exports = router;
