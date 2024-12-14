import { createClient } from "@supabase/supabase-js";

// Create a Supabase client
const supabaseUrl = "https://yssmueithjdfvhhoraex.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc211ZWl0aGpkZnZoaG9yYWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NDg2MjgsImV4cCI6MjA0NTUyNDYyOH0.QwlwZJfBSJh0YQhuFpAHSKevHajg-2zNVAqTElLaEa8"; // Replace with your Supabase anon/public key
export const supabase = createClient(supabaseUrl, supabaseKey);
