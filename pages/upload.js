import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UploadPage({ onUpload }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload() {
    if (!file) return alert("Select a photo first.");

    setIsUploading(true);

    try {
      const fileName = Date.now() + "_" + file.name;

      const { error } = await supabase.storage
        .from("rooms")
        .upload("uploads/" + fileName, file);

      if (error) throw error;

      const publicUrl = supabase.storage
        .from("rooms")
        .getPublicUrl("uploads/" + fileName).data.publicUrl;

      onUpload(publicUrl);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button disabled={isUploading} onClick={handleUpload}>
        {isUploading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
}
