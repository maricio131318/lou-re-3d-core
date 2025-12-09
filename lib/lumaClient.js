// lib/lumaClient.js
import axios from "axios";

const BASE = "https://api.lumalabs.ai/dream-machine/v1";

const AUTH = {
  Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
};

function requireKey() {
  if (!process.env.LUMA_API_KEY) {
    throw new Error("Missing LUMA_API_KEY in environment");
  }
}

/**
 * Create a RESTYLE IMAGE using Photon (photon-1)
 */
export async function generateRestyle(imageUrl, prompt) {
  requireKey();

  if (!imageUrl) {
    throw new Error("generateRestyle: imageUrl is required");
  }

  const body = {
    model: "photon-1",
    prompt:
      prompt ||
      "Restyle this room into a clean, modern interior with natural light.",
    aspect_ratio: "16:9",

    // Tell Luma to restyle the existing image
    modify_image_ref: {
      url: imageUrl,
      weight: 0.85,
    },
  };

  // IMPORTANT: image endpoint (not the video one)
  const { data } = await axios.post(`${BASE}/generations/image`, body, {
    headers: {
      ...AUTH,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  // queued job: { id, state, assets?: [], ... }
  return data;
}

/**
 * Poll job status
 */
export async function getGeneration(id) {
  requireKey();

  const { data } = await axios.get(`${BASE}/generations/${id}`, {
    headers: {
      ...AUTH,
      accept: "application/json",
    },
  });

  return data;
}

/**
 * Wait until Photon is done
 */
export async function waitForGeneration(
  id,
  { tries = 60, intervalMs = 2000 } = {}
) {
  for (let i = 0; i < tries; i++) {
    const job = await getGeneration(id);

    if (job.state === "completed") return job;
    if (job.state === "failed") {
      throw new Error(job.failure_reason || "Luma generation failed");
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error("Timed out waiting for Luma generation");
}

/**
 * Extract usable image URL from Luma response
 */
export function extractAssetUrl(data) {
  if (!data) return null;

  // 1) Preferred: assets array (this is what you're seeing in the logs)
  if (Array.isArray(data.assets) && data.assets.length > 0) {
    const asset =
      data.assets.find((a) => a.type === "image") ||
      data.assets.find((a) => a.mime?.includes("image")) ||
      data.assets[0];

    // Luma is returning `image: "https://..."` for you
    if (typeof asset?.image === "string") return asset.image;
    if (typeof asset?.url === "string") return asset.url;
  }

  // 2) output array fallback
  if (Array.isArray(data.output) && data.output.length > 0) {
    const first = data.output[0];
    if (typeof first === "string") return first;
    if (first?.url) return first.url;
    if (first?.image_url) return first.image_url;
  }

  // 3) direct field
  if (typeof data.image === "string") return data.image;

  console.warn("[extractAssetUrl] No image URL found in Luma response:", data);
  return null;
}

export default {
  generateRestyle,
  getGeneration,
  waitForGeneration,
  extractAssetUrl,
};