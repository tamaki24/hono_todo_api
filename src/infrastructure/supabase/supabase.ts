import { createClient } from "@supabase/supabase-js/dist/main/index.js";

if (!process.env.SUPABASE_URL) {
	throw new Error("SUPABASE_URL is not defined");
}
const supabaseUrl = process.env.SUPABASE_URL;

if (!process.env.SUPABASE_ANON_KEY) {
	throw new Error("SUPABASE_ANON_KEY is not defined");
}
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
