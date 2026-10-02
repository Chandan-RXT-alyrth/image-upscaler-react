# 🎨 Image Upscaler

A powerful web application to enhance and upscale images from URLs to higher quality. Built with React, Express, and Sharp.

## ✨ Features

- ✅ **URL-based Image Processing** - Paste any public image URL
- ✅ **Multiple Upscale Factors** - 1.5x, 2x, 3x, or 4x enlargement
- ✅ **Multiple Output Formats** - PNG, JPG, WEBP
- ✅ **Quality Control** - Adjust output quality from 50-100%
- ✅ **Real-time Preview** - See the result before downloading
- ✅ **Beautiful UI** - Modern, responsive interface with dark theme
- ✅ **No Dependencies on External APIs** - Run completely locally

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js
- **Image Processing**: Sharp (libvips)
- **Styling**: CSS3 with gradients and animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Chandan-RXT-alyrth/image-upscaler-react.git
cd image-upscaler-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

Run both the backend server and frontend dev server:

```bash
npm run dev
```

Or run them separately:

**Terminal 1 - Backend API:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 4. Open in Browser

Visit: `http://localhost:5173`

## 📖 How to Use

### Step 1: Enter Image URL
- Copy any public image URL (e.g., from Google Images)
- Paste it into the "Image URL" field
- Example: `https://example.com/photo.jpg`

### Step 2: Configure Settings

**Upscale Factor:**
- Select how much to enlarge: 1.5x, 2x, 3x, or 4x
- Higher values create larger images but may reduce sharpness

**Output Format:**
- **PNG**: Lossless, best for graphics and images with transparency
- **JPG**: Compressed, best for photographs
- **WEBP**: Modern format, best quality-to-size ratio

**Quality Slider:**
- Adjust from 50% (smaller file) to 100% (best quality)
- Recommended: 85-95% for best results

### Step 3: Process
- Click **"🚀 Enhance & Download"**
- Wait for processing (usually 5-15 seconds)
- Preview will appear in the "📸 Preview" section

### Step 4: Download
- Click **"⬇️ Download [filename]"**
- File will be saved to your Downloads folder

## 🎯 Tips for Best Results

✅ **Do:**
- Use high-resolution source images (1920x1080 or higher)
- Use JPG for photos, PNG for graphics
- Adjust quality based on your needs
- Test with different URLs

❌ **Avoid:**
- Very small images (< 400x400px) - quality loss amplifies
- Extremely high upscale factors (4x) with low-quality sources
- Images from hosts that block hotlinking

## 🔧 API Endpoints

### Health Check
```
GET /api/health
```

Returns:
```json
{ "status": "OK", "message": "Image Upscaler API is running" }
```

### Upscale Image
```
POST /api/upscale
Content-Type: application/json
```

Body:
```json
{
  "url": "https://example.com/image.jpg",
  "scale": 2,
  "format": "png",
  "quality": 90
}
```

Response: Image file (binary)

## 🌐 Deployment

### Deploy to Vercel (Frontend Only)

```bash
npm install -g vercel
vercel
```

### Deploy to Render (Full Stack)

1. Push to GitHub
2. Connect repo to Render
3. Set build command: `npm install`
4. Set start command: `npm run dev`

### Environment Variables

Create `.env` file:
```
PORT=3001
NODE_ENV=production
```

## 📊 Upscaling Algorithm

The app uses **Lanczos3** resampling kernel for high-quality upscaling:
- Preserves edges and details
- Reduces artifacts and blur
- Applies sharpening filter for enhanced clarity
- Optimizes compression based on format

## ⚠️ Limitations

- Only works with **public image URLs** (no authentication required)
- Some hosts block direct downloads (e.g., Instagram, Twitter)
- Upscaling quality depends on source image resolution
- Cannot create details that don't exist in the source
- Max file size: 50MB

## 🐛 Troubleshooting

### "Image URL does not point to an image"
- The URL might be invalid or blocked
- Try a different image URL
- Check if the URL is publicly accessible

### "Could not process the image"
- The host may block direct downloads
- Image file might be corrupted
- Try a different image

### Port already in use
```bash
# Change port in server.js or use environment variable
PORT=3002 npm run server
```

### Slow processing
- Reducing quality settings speeds up processing
- Lower upscale factors are faster
- Server specs affect processing time

## 📦 Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a Pull Request

## 📄 License

MIT License - feel free to use this project freely

## 🙏 Acknowledgments

- [Sharp](https://github.com/lovell/sharp) - Image processing
- [Express](https://expressjs.com/) - Web framework
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Frontend tooling

## 📞 Support

If you encounter issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Provide details about the error and image URL

---

**Made with ❤️ by Chandan-RXT-alyrth**
