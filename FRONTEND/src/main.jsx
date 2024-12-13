import React from "react";
import ReactDOM from "react-dom/client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import App from "./App";
import "./index.css";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig';
import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SessionContextProvider supabaseClient={supabaseClient}>
                <App />
        </SessionContextProvider>
    </React.StrictMode>
);
