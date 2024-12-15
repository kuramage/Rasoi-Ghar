const express = require('express');
const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");


// Initialize Supabase client using environment variables
const supabase = createClient(
    process.env.SUPABASE_URL,    // Accessing SUPABASE_URL from environment variables
    process.env.SUPABASE_ANON_KEY // Accessing SUPABASE_ANON_KEY from environment variables
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

module.exports = router;
