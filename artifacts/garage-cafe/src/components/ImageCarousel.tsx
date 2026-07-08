import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageCarouselProps {
  images: string[];
  alts?: string[];
  className?: string;
  aspectRatio?: string;
  autoPlayInterval?: number;
}

export default function ImageCarousel({
  images,
  alts,
  className = "",
  aspectRatio = "aspect-[4/5]",
  autoPlayInterval = 4000,
}: ImageCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => [prev + newDirection, newDirection]);
    },
    []
  );

  const goTo = useCallback((index: number) => {
    const diff = index - imageIndex;
    setPage(([prev]) => [prev + diff, diff > 0 ? 1 : -1]);
  }, [imageIndex]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [paginate, autoPlayInterval]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x;
    const velocity = info.velocity.x;
    if (Math.abs(velocity) > 300 || Math.abs(swipe) > 80) {
      if (swipe < 0) paginate(1);
      else paginate(-1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotate: dir > 0 ? -5 : 5,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotate: dir < 0 ? -5 : 5,
    }),
  };

  if (!images.length) return null;

  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspectRatio} ${className} group`}>
      {/* Images */}
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={() => {
          if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        }}
        onMouseUp={() => {
          autoPlayRef.current = setInterval(() => paginate(1), autoPlayInterval);
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={page}
            src={images[imageIndex]}
            alt={alts?.[imageIndex] ?? `Image ${imageIndex + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragStart={() => {
              if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
            loading="lazy"
          />
        </AnimatePresence>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          paginate(-1);
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10"
        aria-label="Previous image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          paginate(1);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10"
        aria-label="Next image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/80 text-[11px] font-['Montserrat'] font-semibold tracking-wider z-10">
        {imageIndex + 1} / {images.length}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            className={`transition-all duration-300 rounded-full ${
              i === imageIndex
                ? "w-5 h-1.5 bg-[#B8860B]"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}