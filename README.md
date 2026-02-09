# Animated Image Slider

A beautiful, modern image slider with circular thumbnail navigation built with React, Framer Motion, and Tailwind CSS.

## Features

- 🎨 Glassmorphism UI design
- 🔄 Smooth slide animations when clicking thumbnails
- 👆 Drag/swipe support on main image
- ⭕ Circular thumbnail navigation at bottom
- 🎯 Active thumbnail indicator with ring animation
- ⬅️➡️ Left/Right arrow navigation
- 📱 Responsive design

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```

## Customization

Replace the image URLs in `src/components/ImageSlider.jsx` with your own images:

```javascript
const images = [
  {
    id: 1,
    url: 'your-large-image-url',
    title: 'Your Title',
    thumb: 'your-thumbnail-url'
  },
  // ... add more images
]
```

## Tech Stack

- React 18
- Vite
- Framer Motion (animations)
- Tailwind CSS (styling)
- Lucide React (icons)
