// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// IMPORTANT: In production, use environment variables (import.meta.env.VITE_SUPABASE_URL)
// For this migration, we are porting the existing config constants, but putting them in a slightly safer place
// or ideally using env vars if the user provides them. Since I don't have new env vars, I'll use the values found in config.js.

const SUPABASE_URL = "https://jqiifqmiucpqeiytqhkk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
