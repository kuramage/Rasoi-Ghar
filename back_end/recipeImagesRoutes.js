const express = require('express');
const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");


// Initialize Supabase client using environment variables
const supabase = createClient(
    process.env.SUPABASE_URL,    // Accessing SUPABASE_URL from environment variables
    process.env.SUPABASE_ANON_KEY // Accessing SUPABASE_ANON_KEY from environment variables
  );


const router = Router();

// Configure multer for file upload 
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory before uploading to Supabase
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit for images
});

// Define CDN base URL (replace with your actual Supabase CDN URL)
const CDNURL = "https://yssmueithjdfvhhoraex.supabase.co/storage/v1/object/public/Images/";

// Route to upload an image
router.post("/upload", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file provided." });
    }

    const file = req.file;
    const uniqueFileName = `${uuidv4()}`; // Generate a unique filename using only UUID
    const bucketName = "Images"; // Supabase bucket name for images

    try {
        // Upload the image to Supabase Storage
        const { error } = await supabase.storage
            .from(bucketName)
            .upload(uniqueFileName, file.buffer, {
                contentType: file.mimetype,
                upsert: true, // Replace existing file if the name matches
            });

        if (error) {
            console.error("Error uploading image:", error.message);
            return res.status(500).json({
                message: "Failed to upload image.",
                error: error.message,
            });
        }

        // Construct the public URL using the CDN base URL
        const imageUrl = `${CDNURL}${uniqueFileName}`;

        // Respond with the image URL
        return res.status(200).json({
            message: "Image uploaded successfully!",
            imageUrl: imageUrl,
        });
    } catch (err) {
        console.error("Error during image upload:", err.message);
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message,
        });
    }
});

module.exports = router;
