import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [scale, setScale] = useState("2");
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState("90");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl.trim()) {
      setStatus("❌ Please enter an image URL.");
      return;
    }

    setLoading(true);
    setStatus("⏳ Processing image...");
    setPreviewUrl("");
    setDownloadUrl("");

    try {
      const response = await fetch("/api/upscale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: imageUrl,
          scale: Number(scale),
          format,
          quality: Number(quality)
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Request failed.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      setPreviewUrl(objectUrl);
      setDownloadUrl(objectUrl);
      const finalName = format === "jpeg" ? "jpg" : format;
      setFileName(`upscaled-image.${finalName}`);
      setStatus("✅ Image processed successfully! Ready to download.");
    } catch (error) {
      setStatus(`❌ ${error.message}`);
      setPreviewUrl("");
      setDownloadUrl("");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    // Future: handle file drops
  };

  return (
    <div className="page">
      <div className="stars"></div>
      <div className="card">
        <div className="header">
          <h1>🎨 Image Upscaler</h1>
          <p className="subtitle">Paste an image URL and enhance it to higher quality</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className="input-group drag-zone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="imageUrl">📎 Image URL</label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />
            <small>Paste any public image URL here</small>
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label htmlFor="scale">⬆️ Upscale Factor</label>
              <select id="scale" value={scale} onChange={(e) => setScale(e.target.value)}>
                <option value="1.5">1.5x (50% larger)</option>
                <option value="2">2x (Double size)</option>
                <option value="3">3x (Triple size)</option>
                <option value="4">4x (Quadruple size)</option>
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="format">🎯 Format</label>
              <select id="format" value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="png">PNG (Lossless)</option>
                <option value="jpeg">JPG (Compressed)</option>
                <option value="webp">WEBP (Modern)</option>
              </select>
            </div>
          </div>

          <div className="control-group">
            <label htmlFor="quality">✨ Quality: {quality}%</label>
            <input
              id="quality"
              type="range"
              min="50"
              max="100"
              step="5"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="slider"
            />
            <small>Higher = Better quality but larger file size</small>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              <>🚀 Enhance & Download</>
            )}
          </button>
        </form>

        {status && (
          <div className={`status ${status.includes("❌") ? "error" : status.includes("✅") ? "success" : "info"}`}>
            {status}
          </div>
        )}

        {previewUrl && (
          <div className="preview-section">
            <h2>📸 Preview</h2>
            <div className="preview-box">
              <img src={previewUrl} alt="Upscaled preview" />
            </div>

            {downloadUrl && (
              <a href={downloadUrl} download={fileName} className="download-btn">
                ⬇️ Download {fileName}
              </a>
            )}
          </div>
        )}

        <div className="info-box">
          <h3>💡 Tips</h3>
          <ul>
            <li>Use high-resolution source images for best results</li>
            <li>PNG is best for images with transparency; JPG for photos</li>
            <li>Higher quality settings create larger files</li>
            <li>Some image hosts may block direct downloads</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
