# KBooth 📸

KBooth is a modern, premium photobooth web application built with React and Tailwind CSS. Capture your best moments with retro style, apply filters, and choose from multiple layouts and frames.

![Capture Mode](https://raw.githubusercontent.com/GafanKall/KBooth/master/src/assets/preview.png) *(Note: User can replace this with actual hosted image)*

## ✨ Features

- 🎞️ **Multi-Layout Support**: Choose between a Single Selfie (1x1) or a 4-Photo Grid (2x2).
- ⏱️ **Flexible Timer**: Choose between 3s, 5s, or 10s countdown for the perfect shot.
- 🎨 **Real-time Filters**: High-quality filters (Classic, Noir, Sepia, Cold) to enhance your photos.
- 🖼️ **Premium Frames**: Various frame styles (White, Black, Wood, Glassmorphism).
- 📸 **Camera Control**: Manual camera permission trigger and troubleshooting tools for a seamless experience.
- 💾 **Local Gallery**: All sessions are saved locally using IndexedDB (no server required).
- ⚡ **Lightning Fast**: Built with Vite and React 19 for a smooth, high-performance experience.
- 📱 **Responsive Design**: Works beautifully on desktops and tablets.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Storage**: IndexedDB (via `idb`)
- **Camera**: `react-webcam`

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GafanKall/KBooth.git
   cd KBooth
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 Deployment

KBooth is optimized for one-click deployment on **Vercel**. 
Simply import your GitHub repository and Vercel will handle the rest!

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
Made with ❤️ by [GafanKall](https://github.com/GafanKall)
