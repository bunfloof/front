"use client";
import { useState, useEffect, useRef } from "react";
import { Slide1 } from "@/components/slides/Slide1";
import { Slide2 } from "@/components/slides/Slide2";
import { Slide3 } from "@/components/slides/Slide3";

const TOTAL_SLIDES = 3;
const SLIDE_DURATION = 10000; // 10 seconds

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [actualSlideIndex, setActualSlideIndex] = useState(1); // Start at 1 (real first slide)

  const touchStartX = useRef(0);
  const mouseStartX = useRef(0);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionEndRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Clear any existing timer
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }

    // Start new timer for auto-rotation
    autoRotateTimerRef.current = setTimeout(() => {
      setCurrentSlide((current) => (current + 1) % TOTAL_SLIDES);
      setProgress(0);
    }, SLIDE_DURATION);

    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, [currentSlide]);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 100 / (SLIDE_DURATION / 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setActualSlideIndex(index + 1); // +1 because of prepended slide
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActualSlideIndex((prev) => prev + 1);

    // Set up transition end handler for seamless loop
    transitionEndRef.current = () => {
      if (actualSlideIndex + 1 > TOTAL_SLIDES) {
        // We've reached the clone at the end, jump to real first slide
        setActualSlideIndex(1);
        setCurrentSlide(0);
      } else {
        setCurrentSlide((actualSlideIndex + 1 - 1) % TOTAL_SLIDES);
      }
      setIsTransitioning(false);
    };
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActualSlideIndex((prev) => prev - 1);

    // Set up transition end handler for seamless loop
    transitionEndRef.current = () => {
      if (actualSlideIndex - 1 < 1) {
        // We've reached the clone at the start, jump to real last slide
        setActualSlideIndex(TOTAL_SLIDES);
        setCurrentSlide(TOTAL_SLIDES - 1);
      } else {
        setCurrentSlide((actualSlideIndex - 1 - 1) % TOTAL_SLIDES);
      }
      setIsTransitioning(false);
    };
  };

  // Handle transition end
  useEffect(() => {
    const timer = setTimeout(() => {
      if (transitionEndRef.current) {
        transitionEndRef.current();
        transitionEndRef.current = null;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [actualSlideIndex]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    touchStartX.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const dragPercentage = (dragOffset / containerWidth) * 100;

    if (Math.abs(dragPercentage) > 5) {
      if (dragOffset < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setDragOffset(0);
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    mouseStartX.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - mouseStartX.current;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const dragPercentage = (dragOffset / containerWidth) * 100;

    if (Math.abs(dragPercentage) > 5) {
      if (dragOffset < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  const slides = [
    <Slide1 key="slide-1" />,
    <Slide2 key="slide-2" />,
    <Slide3 key="slide-3" />,
  ];

  // Create infinite loop array: last, all slides, first
  const extendedSlides = [
    slides[slides.length - 1], // Last slide at beginning for seamless wrap
    ...slides,
    slides[0], // First slide at end for seamless wrap
  ];

  const getTranslateX = () => {
    const baseOffset = -actualSlideIndex * 100;
    const dragPercentage = containerRef.current
      ? (dragOffset / containerRef.current.offsetWidth) * 100
      : 0;
    return baseOffset + dragPercentage;
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <section
        ref={containerRef}
        className="relative overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Progress Indicator - Absolute positioned at top left */}
        <div className="absolute top-24 left-0 right-0 z-30 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 max-w-5xl pointer-events-auto">
              {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative w-20 h-1.5 bg-white/20 rounded-full overflow-hidden hover:bg-white/30 transition-colors"
                >
                  <div
                    className={`absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      width: index === currentSlide ? `${progress}%` : "0%",
                    }}
                  />
                  {index < currentSlide && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slides container with transition */}
        <div className="relative w-full">
          <div
            className="flex"
            style={{
              transform: `translateX(${getTranslateX()}%)`,
              transition: isDragging ? "none" : "transform 500ms ease-in-out",
              willChange: "transform",
            }}
          >
            {extendedSlides.map((slide, index) => (
              <div
                key={`slide-${index}`}
                className="w-full flex-shrink-0 relative"
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition Section */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo
            orci, semper vel odio nec, tempor consectetur arcu. Aenean et nisl
            non eros finibus blandit.
          </p>
        </div>
      </section>
    </>
  );
}
