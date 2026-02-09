import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Sample images data - Replace these URLs with your actual images
const images = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop',
    title: 'Summer Outfit 1',
    thumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
    title: 'Fashion Style 2',
    thumb: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=150&h=150&fit=crop'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
    title: 'Cool Look 3',
    thumb: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&h=150&fit=crop'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
    title: 'Elegant Dress 4',
    thumb: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=150&h=150&fit=crop'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop',
    title: 'Modern Style 5',
    thumb: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop',
    title: 'Chic Outfit 6',
    thumb: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=150&h=150&fit=crop'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=600&fit=crop',
    title: 'Trendy Look 7',
    thumb: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=150&h=150&fit=crop'
  }
]

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const dragX = useMotionValue(0)
  
  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 4000)
    
    return () => clearInterval(timer)
  }, [currentIndex])
  
  const paginate = (newDirection) => {
    setDirection(newDirection)
    let newIndex = currentIndex + newDirection
    if (newIndex < 0) newIndex = images.length - 1
    if (newIndex >= images.length) newIndex = 0
    setCurrentIndex(newIndex)
  }

  const goToSlide = (index) => {
    if (index === currentIndex) return
    const newDirection = index > currentIndex ? 1 : -1
    setDirection(newDirection)
    setCurrentIndex(index)
  }

  // Calculate Cover Flow style for each card
  const getCoverFlowStyle = (index) => {
    const offset = index - currentIndex
    const absOffset = Math.abs(offset)
    
    // Active (Center) card
    if (offset === 0) {
      return {
        x: 0,
        scale: 1.2,
        rotateY: 0,
        opacity: 1,
        zIndex: 50,
        filter: 'blur(0px)',
        backdropFilter: 'blur(0px)',
        boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'
      }
    }
    
    // Left cards
    if (offset < 0) {
      return {
        x: offset * 220,
        scale: 0.8,
        rotateY: 45,
        opacity: 0.5,
        zIndex: 50 - absOffset,
        filter: 'blur(2px)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }
    }
    
    // Right cards
    return {
      x: offset * 220,
      scale: 0.8,
      rotateY: -45,
      opacity: 0.5,
      zIndex: 50 - absOffset,
      filter: 'blur(2px)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Dynamic Background - Active image with less blur */}
      <motion.div 
        key={currentIndex}
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={images[currentIndex].url}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>
      
      {/* Text Overlay - Left Side */}
      <div className="absolute top-12 left-12 z-50 text-white pointer-events-none">
        <motion.h1 
          key={currentIndex}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-7xl font-bold leading-tight drop-shadow-2xl"
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          Summer<br />
          bensa<br />
          cool<br />
          outfit
        </motion.h1>
      </div>
      
      {/* Top Right - STYLE Text */}
      <div className="absolute top-8 right-12 z-50 pointer-events-none">
        <h2 
          className="text-white text-8xl font-bold tracking-widest drop-shadow-2xl opacity-90"
          style={{ 
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
          }}
        >
          STYLE
        </h2>
      </div>

      {/* Main Image Container - Only Active Image */}
      <div 
        className="flex items-center justify-center h-[calc(100vh-200px)] relative"
        style={{ perspective: '1500px' }}
      >
        <motion.div
          key={currentIndex}
          className="relative"
          initial={{ 
            x: 600,
            y: 400,
            rotateZ: 45,
            rotateY: -90, 
            opacity: 0, 
            scale: 0.3 
          }}
          animate={{ 
            x: 0,
            y: 0,
            rotateZ: 0,
            rotateY: 0, 
            opacity: 1, 
            scale: 1 
          }}
          exit={{ 
            x: -600,
            y: 400,
            rotateZ: -45,
            rotateY: 90, 
            opacity: 0, 
            scale: 0.3 
          }}
          transition={{
            type: 'spring',
            stiffness: 40,
            damping: 15,
            duration: 2.5
          }}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center'
          }}
        >
          {/* Single Active Card with white border - LARGER SIZE */}
          <div
            className="relative w-[550px] h-[700px] rounded-3xl overflow-hidden border-[6px] border-white shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 255, 255, 0.1)'
            }}
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="w-full h-full object-cover"
              draggable="false"
            />
            
            {/* Card title - Bottom Left */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
            >
              <h3 className="text-white text-3xl font-bold drop-shadow-lg">
                {images[currentIndex].title}
              </h3>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Thumbnails at Bottom - Semi Circle Layout */}
      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black via-black/95 to-transparent z-50">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="relative" style={{ width: '700px', height: '180px' }}>
            {images.map((image, index) => {
              const isActive = index === currentIndex
              const total = images.length
              const centerIndex = (total - 1) / 2
              const position = index - centerIndex
              
              // Semi-circle calculations for D-shape - More gap between thumbnails
              const angle = position * 20 // Increased angle for more spacing
              const radius = 240 // Reduced radius to keep thumbnails on screen
              const angleRad = (angle * Math.PI) / 180
              
              // Calculate X and Y positions for semi-circle arc
              const xPos = Math.sin(angleRad) * radius
              const yPos = -Math.abs(Math.cos(angleRad) * radius) + radius - 90
              
              return (
                <motion.button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`absolute rounded-full overflow-hidden border-[5px] ${
                    isActive ? 'border-white shadow-xl shadow-white/30' : 'border-white/50'
                  } hover:border-white transition-all cursor-pointer bg-white`}
                  style={{
                    left: '50%',
                    bottom: '20px',
                    transformOrigin: 'center'
                  }}
                  animate={{
                    x: xPos,
                    y: yPos,
                    width: isActive ? 100 : 70,
                    height: isActive ? 100 : 70,
                    scale: isActive ? 1.15 : 1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 22
                  }}
                  whileHover={{ scale: isActive ? 1.2 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image.thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Active indicator glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 ring-[6px] ring-purple-400/70 rounded-full"
                      style={{
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.6), inset 0 0 20px rgba(168, 85, 247, 0.2)'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Overlay for inactive thumbnails */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 rounded-full" />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
