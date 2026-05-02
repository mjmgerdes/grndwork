import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars missing. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export async function joinWaitlist(payload) {
  // Use { returning: "minimal" } so anon role does not need SELECT.
  const { error } = await supabase
    .from("waitlist")
    .insert(
      [
        {
          name: payload.name,
          email: payload.email,
          school: payload.school,
          graduation_year: payload.graduation_year,
          career_interest: payload.career_interest,
        },
      ],
      { returning: "minimal" }
    );

  if (error) throw error;
  return { ok: true };
}
