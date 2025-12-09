# Lou‑re • 3D Core (Phase 1)
Upload GLB/GLTF models to Supabase Storage and view them in-browser.

## Setup
1. `npm i`
2. `cp .env.example .env.local` and fill `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In Supabase Storage create bucket **rooms** (Public for quick start)
4. `npm run dev` then open `http://localhost:3000`

## Notes
- USDZ isn't rendered in the viewer; we provide a Quick Look link for AR.
- Next steps: first‑person controls, object swapping, AI renders.
