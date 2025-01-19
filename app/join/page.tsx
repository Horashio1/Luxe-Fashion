"use client"; // For client-side rendering in Next.js App Router

import React, { useState } from "react";

export default function SingleFileUploadPage() {
  // State to store the folder name and the single file
  const [folderName, setFolderName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Track upload status or response message
  const [statusMessage, setStatusMessage] = useState("");

  // Your Apps Script Web App endpoint (make sure it’s deployed for "Anyone" access)
  const uploadScriptUrl = "https://script.google.com/macros/library/d/1zTQslAFCjSVOPfSsYgoKihbyEyZN-xZq2AlKus8XXWCBMoHRA4V2cUu2/1";

  // This function uploads the file + folder name to the Apps Script
  const uploadFileToDrive = async () => {
    try {
      if (!file) {
        throw new Error("Please select a file to upload.");
      }

      // Build FormData object
      const formData = new FormData();
      formData.append("folderName", folderName || "Unknown-Designer");
      formData.append("file1", file);

      // Make POST request to Apps Script
      const response = await fetch(uploadScriptUrl, {
        method: "POST",
        body: formData,
        // mode: "cors" allows us to see HTTP errors. 
        // If you MUST bypass CORS, you can set mode: "no-cors", 
        // but you'll lose detailed error info.
        mode: "no-cors",
      });

      // Log status for debugging
      console.log("Response status code:", response.status);
      console.log("Response status text:", response.statusText);

      // If the server responded with a non-OK status, throw an error
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error uploading file: ${errorText}`);
      }

      // Read the success text (Apps Script usually returns something like "Files uploaded successfully!")
      const textResponse = await response.text();
      setStatusMessage(`Upload success! Server says: ${textResponse}`);

    } catch (error: any) {
      setStatusMessage(`Upload failed: ${error.message}`);
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Uploading...");
    uploadFileToDrive();
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Test Single File Upload to Google Drive</h1>

      <form onSubmit={handleSubmit}>
        {/* Folder Name */}
        <div style={{ marginBottom: "1em" }}>
          <label>
            <strong>Folder Name:</strong>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              style={{ display: "block", marginTop: "0.5em", width: "100%" }}
              placeholder="e.g. MyGoogleDriveFolder"
              required
            />
          </label>
        </div>

        {/* Single File Input */}
        <div style={{ marginBottom: "1em" }}>
          <label>
            <strong>Select File:</strong>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              style={{ display: "block", marginTop: "0.5em" }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: "0.5em 1em" }}>
          Upload
        </button>
      </form>

      {statusMessage && (
        <p style={{ marginTop: "1.5em", color: "blue" }}>{statusMessage}</p>
      )}
    </div>
  );
}
