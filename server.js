import express from "express";
import axios from "axios";
import sharp from "sharp";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Image Upscaler API is running" });
});

// Main upscale endpoint
app.post("/api/upscale", async (req, res) => {
  try {
    const { url, scale = 2, format = "png", quality = 90 } = req.body;

    // Validation
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Image URL is required." });
    }

    const imageUrl = url.trim();
    if (!/^https?:\/\//i.test(imageUrl)) {
      return res.status(400).json({ error: "Please provide a valid http/https URL." });
    }

    // Fetch image from URL
    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
      timeout: 30000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
      }
    });

    const contentType = response.headers["content-type"] || "";
    if (!contentType.startsWith("image/")) {
      return res.status(400).json({ error: "The URL does not point to an image." });
    }

    const inputBuffer = Buffer.from(response.data);
    const metadata = await sharp(inputBuffer).metadata();

    const originalWidth = metadata.width || 1;
    const originalHeight = metadata.height || 1;

    const targetWidth = Math.max(1, Math.round(originalWidth * Number(scale)));
    const targetHeight = Math.max(1, Math.round(originalHeight * Number(scale)));

    let outputBuffer;

    // Process based on format
    if (format === "png") {
      outputBuffer = await sharp(inputBuffer)
        .resize(targetWidth, targetHeight, {
          fit: "cover",
          kernel: sharp.kernel.lanczos3
        })
        .sharpen()
        .png({
          quality: Number(quality),
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toBuffer();
    } else if (format === "jpeg" || format === "jpg") {
      outputBuffer = await sharp(inputBuffer)
        .resize(targetWidth, targetHeight, {
          fit: "cover",
          kernel: sharp.kernel.lanczos3
        })
        .sharpen()
        .jpeg({
          quality: Number(quality),
          mozjpeg: true
        })
        .toBuffer();
    } else if (format === "webp") {
      outputBuffer = await sharp(inputBuffer)
        .resize(targetWidth, targetHeight, {
          fit: "cover",
          kernel: sharp.kernel.lanczos3
        })
        .sharpen()
        .webp({
          quality: Number(quality),
          effort: 6
        })
        .toBuffer();
    } else {
      return res.status(400).json({ error: "Unsupported output format." });
    }

    const safeFormat = format === "jpg" ? "jpeg" : format;
    const fileName = `upscaled-image.${safeFormat}`;

    res.setHeader("Content-Type", `image/${safeFormat}`);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    return res.send(outputBuffer);
  } catch (error) {
    console.error("Upscale failed:", error.message);
    return res.status(500).json({
      error: "Could not process the image. The URL may be blocked, invalid, or not publicly accessible."
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Image Upscaler API running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
});
