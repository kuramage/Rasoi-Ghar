import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://yssmueithjdfvhhoraex.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc211ZWl0aGpkZnZoaG9yYWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NDg2MjgsImV4cCI6MjA0NTUyNDYyOH0.QwlwZJfBSJh0YQhuFpAHSKevHajg-2zNVAqTElLaEa8";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
