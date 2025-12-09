import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { room_id, layout } = req.body;

  const { data, error } = await supabase
    .from("room_layouts")
    .upsert({
      room_id,
      layout_json: layout,
      updated_at: new Date(),
    });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ success: true });
}