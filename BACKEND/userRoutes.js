import { Router } from "npm:express";
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

// Route to fetch user details by userId
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch the user details from the 'userDetails' table using userId
        const { data, error } = await supabase
            .from("userDetails")
            .select("*")
            .eq("userId", userId)
            .single();

        if (error) {
            console.error("Error fetching user details:", error.message);
            return errorResponse(res, 404, "User not found.");
        }

        return successResponse(res, "User details fetched successfully!", data);
    } catch (err) {
        console.error("Error during fetching user details:", err.message);
        return errorResponse(res, 500, "Internal server error.");
    }
});

export default router;
