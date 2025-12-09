 import { generateRestyle, waitForGeneration } from "../../lib/lumaClient";

// Helper to safely extract the image URL from Luma's response
function getAssetUrl(finalResult) {
  if (!finalResult) return null;

  const assets = finalResult.assets || {};

  // Most important case: Photon returns a direct image string
  if (typeof assets.image === "string") {
    return assets.image;
  }

  // If Luma ever wraps it as an object
  if (assets.image && typeof assets.image.url === "string") {
    return assets.image.url;
  }

  // If assets is an array (future-proofing)
  if (Array.isArray(assets) && assets.length) {
    const first = assets[0];
    if (typeof first === "string") return first;
    if (first && typeof first.url === "string") return first.url;
  }

  // Nothing found
  console.error("[restyle] Could not find asset URL in assets:", assets);
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl, prompt } = req.body || {};

  if (!imageUrl) {
    return res.status(400).json({
      success: false,
      error: "Missing imageUrl",
    });
  }

  try {
    // 1) Kick off Photon restyle job
    const queued = await generateRestyle(imageUrl, prompt);

    let finalResult = queued;

    // 2) If it’s not done yet, poll until it completes
    if (queued?.id && queued?.state !== "completed") {
      finalResult = await waitForGeneration(queued.id);
    }

    // 3) Extract the image URL from Luma response
    const assetUrl = getAssetUrl(finalResult);

    if (!assetUrl) {
      return res.status(500).json({
        success: false,
        error: "Generation finished but no asset URL returned",
        raw: finalResult,
      });
    }

    // 4) Return URL to the frontend
    return res.status(200).json({
      success: true,
      assetUrl,
      raw: finalResult,
    });
  } catch (err) {
    console.error("[/api/restyle] error:", {
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
    });

    return res.status(err?.response?.status || 500).json({
      success: false,
      error: "Failed to restyle image",
      detail: err?.response?.data || err?.message,
    });
  }
}