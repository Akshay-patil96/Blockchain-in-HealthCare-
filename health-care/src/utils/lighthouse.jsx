import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";

export default function LighthouseTest() {
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");

  async function handleUpload(e) {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setStatus("⏳ Uploading file to Lighthouse...");

      // API key from .env
      const apiKey = process.env.REACT_APP_LIGHTHOUSE_API_KEY;

      // Upload file
      const output = await lighthouse.upload(file, apiKey);

      setCid(output.data.Hash);
      setStatus("✅ Upload successful!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Upload failed: " + error.message);
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-3">Lighthouse Upload Test</h2>
      <input type="file" onChange={handleUpload} className="mb-4" />
      {status && <p>{status}</p>}
      {cid && (
        <p>
          ✅ CID: {cid} <br />
          🌐 View file:{" "}
          <a
            href={`https://gateway.lighthouse.storage/ipfs/${cid}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Open in IPFS Gateway
          </a>
        </p>
      )}
    </div>
  );
}
