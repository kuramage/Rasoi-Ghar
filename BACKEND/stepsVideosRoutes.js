import { Router } from "npm:express";
import { createClient } from "npm:@supabase/supabase-js";
import multer from "npm:multer";
import { v4 as uuidv4 } from "npm:uuid";

// Initialize Supabase client using environment variables
const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY")
);

const router = Router();

// Configure multer for file upload
const upload = multer({
    storage: multer.memoryStorage(), // Store the file in memory before uploading to Supabase
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
});

// Define CDN base URL (replace with your actual Supabase CDN URL)
const CDNURL = "https://yssmueithjdfvhhoraex.supabase.co/storage/v1/object/public/Videos/";

// Route to upload a video
router.post("/upload", upload.single("video"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file provided." });
    }

    const file = req.file;
    const uniqueFileName = `${uuidv4()}.mp4`; // Generate a unique filename
    const bucketName = "Videos"; // Supabase bucket name

    try {
        // Upload the video to Supabase Storage
        const { error } = await supabase.storage
            .from(bucketName)
            .upload(uniqueFileName, file.buffer, {
                contentType: file.mimetype,
                upsert: true, // Replace existing file if the name matches
            });

        if (error) {
            console.error("Error uploading video:", error.message);
            return res.status(500).json({
                message: "Failed to upload video.",
                error: error.message,
            });
        }

        // Construct the public URL using the CDN base URL
        const videoUrl = `${CDNURL}${uniqueFileName}`;

        // Respond with the video URL
        return res.status(200).json({
            message: "Video uploaded successfully!",
            videoUrl: videoUrl,
        });
    } catch (err) {
        console.error("Error during video upload:", err.message);
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message,
        });
    }
});

export default router;
