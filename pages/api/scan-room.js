import Busboy from "busboy";
import path from "path";
import crypto from "crypto";
import supabaseAdmin from "../../lib/supabaseAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    let fileBuffer = Buffer.alloc(0);
    let filename = null;
    let mimeType = null;

    busboy.on("file", (fieldname, file, info) => {
      const { filename: incomingFilename, mimeType: incomingMimeType } = info;

      if (fieldname !== "video") {
        file.resume();
        return;
      }

      filename = incomingFilename;
      mimeType = incomingMimeType;

      file.on("data", (data) => {
        fileBuffer = Buffer.concat([fileBuffer, data]);
      });

      file.on("error", (err) => reject(err));
    });

    busboy.on("error", (err) => reject(err));

    busboy.on("finish", () => {
      resolve({ fileBuffer, filename, mimeType });
    });

    req.pipe(busboy);
  });
}

async function reconstructRoomFromVideo(videoPublicUrl) {
  // TODO: call Luma 3D reconstruction API here with axios and process.env.LUMA_API_KEY
  // For now, return a known sample model so the flow works end-to-end.
  console.log("Stub reconstructRoomFromVideo called with:", videoPublicUrl);
  return "/models/the_morning_room/the_morning_room.glb";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.headers["content-type"]?.includes("multipart/form-data")) {
    return res.status(400).json({ error: "Content-Type must be multipart/form-data" });
  }

  try {
    const { fileBuffer, filename, mimeType } = await parseMultipart(req);

    if (!filename || !fileBuffer || fileBuffer.length === 0) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const ext = path.extname(filename || "").toLowerCase() || ".mp4";
    const uniqueId = crypto.randomBytes(6).toString("hex");
    const objectPath = `scans/${Date.now()}-${uniqueId}${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("rooms")
      .upload(objectPath, fileBuffer, {
        contentType: mimeType || "video/mp4",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload failed", uploadError);
      return res.status(500).json({ error: "Failed to upload video" });
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("rooms")
      .getPublicUrl(objectPath);

    const videoPublicUrl = publicUrlData?.publicUrl;

    const roomModelUrl = await reconstructRoomFromVideo(videoPublicUrl);

    return res.status(200).json({ roomModelUrl });
  } catch (err) {
    console.error("scan-room handler error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
