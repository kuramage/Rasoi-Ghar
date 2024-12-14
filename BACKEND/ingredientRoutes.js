import dotenv from "npm:dotenv";
dotenv.config(); // Load environment variables
//console.log("Environment variables loaded");

import { Router } from "npm:express";
import axios from "npm:axios";
//console.log("Dependencies imported");

const router = Router();
//console.log("Router initialized");

// Load Spoonacular API key from environment variables
const SPOONACULAR_API_KEY = Deno.env.get("SPOONACULAR_API_KEY");
//console.log("Spoonacular API key loaded:", SPOONACULAR_API_KEY);

// Utility function to handle success responses
const successResponse = (res, message, data = {}) => {
    //console.log("Sending success response:", { message, data });
    res.status(200).json({ message, data });
};

// Utility function to handle error responses
const errorResponse = (res, status, message) => {
    //console.log("Sending error response:", { status, message });
    res.status(status).json({ message });
};

router.get("/:id", async (req, res) => {
    //console.log("Received GET request to fetch ingredient details");
    const { id } = req.params;

    //console.log("Ingredient ID received:", id);

    if (!id) {
        //console.log("Ingredient ID is missing");
        return errorResponse(res, 400, "Ingredient ID is required.");
    }

    try {
        //console.log("Calling Spoonacular API");
        const response = await axios.get(
            `https://api.spoonacular.com/food/ingredients/${id}/information`,
            {
                params: {
                    apiKey: SPOONACULAR_API_KEY,
                    amount: 1, // Ensuring the amount parameter is passed
                },
            }
        );

        //console.log("Spoonacular API response received:", response.data);

        // Extract relevant data from the response
        const ingredientData = {
            name: response.data?.name,
        };

        //console.log("Extracted ingredient data:", ingredientData);

        if (!ingredientData.name) {
            //console.log("Ingredient name not found in response");
            return errorResponse(res, 404, "Ingredient not found.");
        }

        //console.log("Sending successful ingredient data response");
        return successResponse(res, "Ingredient details fetched successfully!", ingredientData);
    } catch (err) {
        //console.error("Error fetching ingredient details:", err.message);

        // Handle errors with a focus on API response issues
        if (err.response) {
            //console.log(`API responded with status ${err.response.status}`);
            if (err.response.status === 404) {
                return errorResponse(res, 404, "Ingredient not found.");
            }
            return errorResponse(res, err.response.status, err.response.data.message || "An error occurred.");
        }

        //console.log("Unhandled error occurred while fetching ingredient");
        return errorResponse(res, 500, "Failed to fetch ingredient details.");
    }
});


//console.log("Ingredient route set up completed");
export default router;
