import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const room_id = req.query.room_id;

  const { data, error } = await supabase
    .from("room_layouts")
    .select("layout_json")
    .eq("room_id", room_id)
    .single();

  if (error) return res.status(400).json({ error });

  res.status(200).json({ layout: data?.layout_json || null });
}