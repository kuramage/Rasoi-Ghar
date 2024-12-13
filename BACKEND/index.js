// server.js or app.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

// Create an instance of express
const app = express();
const port = 5000;

// Enable CORS for your frontend
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

// Sign-up route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json({ message: 'Sign-up successful!', data });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Sign-in route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json({ message: 'Sign-in successful!', data });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
