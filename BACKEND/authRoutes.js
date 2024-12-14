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
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return errorResponse(res, 400, "Email and password are required.");
    }

    try {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            return errorResponse(res, 400, error.message);
        }

        return successResponse(res, "Sign-up successful!", data);
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
