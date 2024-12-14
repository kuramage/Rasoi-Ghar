// authRoutes.js

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

// Sign-up route
router.post("/signup", async (req, res) => {
    const { email, password, userName } = req.body;

    // Validate input
    if (!email || !password || !userName) {
        return errorResponse(res, 400, "Email, password, and userName are required.");
    }

    try {
        // Step 1: Create the user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            // Check if the error is due to duplicate email
            if (authError.message.includes("already registered")) {
                return successResponse(res, "User already exists.", {
                    email: email,
                });
            }
            return errorResponse(res, 400, authError.message);
        }

        // Step 2: Insert user details into the `userDetails` table
        const userId = authData.user?.id; // Supabase automatically generates a user ID
        const { error: insertError } = await supabase
            .from("userDetails")
            .insert([
                {
                    userId: userId,
                    userRecipes: [], // Initialize as an empty array
                    userName: userName,
                    userImage: "https://www.reshot.com/preview-assets/icons/DUYKGBF2XM/hot-food-DUYKGBF2XM.svg", // Initialize as an empty string
                },
            ]);

        if (insertError) {
            console.error("Error inserting into userDetails:", insertError.message);
            return errorResponse(res, 500, "Failed to save user details.");
        }

        return successResponse(res, "Sign-up successful!", {
            userId: userId,
            email: email,
            userName: userName,
        });
    } catch (err) {
        console.error("Error during sign-up:", err.message);
        return errorResponse(res, 500, "Internal server error.");
    }
});

// Sign-in route
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return errorResponse(res, 400, "Email and password are required.");
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return errorResponse(res, 400, error.message);
        }

        return successResponse(res, "Sign-in successful!", data);
    } catch (err) {
        console.error("Error during sign-in:", err.message);
        return errorResponse(res, 500, "Internal server error.");
    }
});

export default router;
