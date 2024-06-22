import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://psjsmxijppolcblwesan.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzanNteGlqcHBvbGNibHdlc2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwMTcyNjgsImV4cCI6MjAzNDU5MzI2OH0.7mPUpZkLstiCOmzwwVA9jL3aUU4dzLadusy4d3GubK4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
