"use client";
import { useState, useEffect, useRef } from "react";
import { Slide1 } from "@/components/slides/Slide1";
import { Slide2 } from "@/components/slides/Slide2";
import { Slide3 } from "@/components/slides/Slide3";
import { Pause, Play } from "lucide-react";

const TOTAL_SLIDES = 2;
const SLIDE_DURATION = 10000; // 10 seconds
const TRANSITION_DURATION = 300; // 300ms - adjust this to make transitions faster/slower

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [actualSlideIndex, setActualSlideIndex] = useState(1); // Start at 1 (real first slide)
  const [enableTransition, setEnableTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const mouseStartX = useRef(0);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionEndRef = useRef<(() => void) | null>(null);
  const dragStartedRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const DRAG_THRESHOLD = 5; // pixels to move before initiating drag

  useEffect(() => {
    // Clear any existing timer
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }

    // Don't start timer if user is dragging or autoplay is paused
    if (isDragging || isPaused) return;

    // Start new timer for auto-rotation
    autoRotateTimerRef.current = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, [currentSlide, isDragging, isPaused]);

  useEffect(() => {
    // Don't animate progress if user is dragging or autoplay is paused
    if (isDragging || isPaused) return;

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
  }, [currentSlide, isDragging, isPaused]);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setActualSlideIndex(index + 1); // +1 because of prepended slide
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const nextActualIndex = actualSlideIndex + 1;
    setActualSlideIndex(nextActualIndex);
    setProgress(0);

    // Set up transition end handler for seamless loop
    transitionEndRef.current = () => {
      if (nextActualIndex > TOTAL_SLIDES) {
        // We've reached the clone at the end, jump to real first slide instantly
        setEnableTransition(false);
        setIsTransitioning(false);

        // Use setTimeout to ensure the transition is disabled before changing position
        setTimeout(() => {
          setActualSlideIndex(1);
          setCurrentSlide(0);

          // Re-enable transition after jump
          setTimeout(() => {
            setEnableTransition(true);
          }, 50);
        }, 50);
      } else {
        setCurrentSlide(nextActualIndex - 1);
        setIsTransitioning(false);
      }
    };
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const prevActualIndex = actualSlideIndex - 1;
    setActualSlideIndex(prevActualIndex);
    setProgress(0);

    // Set up transition end handler for seamless loop
    transitionEndRef.current = () => {
      if (prevActualIndex < 1) {
        // We've reached the clone at the start, jump to real last slide instantly
        setEnableTransition(false);
        setIsTransitioning(false);

        // Use setTimeout to ensure the transition is disabled before changing position
        setTimeout(() => {
          setActualSlideIndex(TOTAL_SLIDES);
          setCurrentSlide(TOTAL_SLIDES - 1);

          // Re-enable transition after jump
          setTimeout(() => {
            setEnableTransition(true);
          }, 50);
        }, 50);
      } else {
        setCurrentSlide(prevActualIndex - 1);
        setIsTransitioning(false);
      }
    };
  };

  // Handle transition end
  useEffect(() => {
    const timer = setTimeout(() => {
      if (transitionEndRef.current) {
        transitionEndRef.current();
        transitionEndRef.current = null;
      }
    }, TRANSITION_DURATION);

    return () => clearTimeout(timer);
  }, [actualSlideIndex]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartedRef.current = false;
    touchStartX.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;

    // Check if we've moved beyond threshold to start dragging
    if (!dragStartedRef.current && Math.abs(diff) > DRAG_THRESHOLD) {
      dragStartedRef.current = true;

      // Prevent default to stop button clicks when dragging
      e.preventDefault();

      // Cancel any ongoing transition - user is taking control
      if (isTransitioning) {
        transitionEndRef.current = null;
        setIsTransitioning(false);
      }

      // If we're on a cloned slide, instantly reset to the real slide position
      if (actualSlideIndex === 0 || actualSlideIndex === TOTAL_SLIDES + 1) {
        setEnableTransition(false);
        const realIndex = actualSlideIndex === 0 ? TOTAL_SLIDES : 1;
        const realSlideIndex = actualSlideIndex === 0 ? TOTAL_SLIDES - 1 : 0;
        setActualSlideIndex(realIndex);
        setCurrentSlide(realSlideIndex);
        // Re-enable transition after instant jump
        setTimeout(() => setEnableTransition(true), 50);
      }

      setIsDragging(true);
    }

    // Update drag offset if we're dragging
    if (dragStartedRef.current) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) {
      dragStartedRef.current = false;
      return;
    }

    setIsDragging(false);
    dragStartedRef.current = false;

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
    isMouseDownRef.current = true;
    dragStartedRef.current = false;
    mouseStartX.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only track if mouse button is pressed
    if (!isMouseDownRef.current) return;

    const currentX = e.clientX;
    const diff = currentX - mouseStartX.current;

    // Check if we've moved beyond threshold to start dragging
    if (!dragStartedRef.current && Math.abs(diff) > DRAG_THRESHOLD) {
      dragStartedRef.current = true;

      // Cancel any ongoing transition - user is taking control
      if (isTransitioning) {
        transitionEndRef.current = null;
        setIsTransitioning(false);
      }

      // If we're on a cloned slide, instantly reset to the real slide position
      if (actualSlideIndex === 0 || actualSlideIndex === TOTAL_SLIDES + 1) {
        setEnableTransition(false);
        const realIndex = actualSlideIndex === 0 ? TOTAL_SLIDES : 1;
        const realSlideIndex = actualSlideIndex === 0 ? TOTAL_SLIDES - 1 : 0;
        setActualSlideIndex(realIndex);
        setCurrentSlide(realSlideIndex);
        // Re-enable transition after instant jump
        setTimeout(() => setEnableTransition(true), 50);
      }

      setIsDragging(true);
    }

    // Update drag offset if we're dragging
    if (dragStartedRef.current) {
      setDragOffset(diff);
    }
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;

    if (!isDragging) {
      dragStartedRef.current = false;
      return;
    }

    setIsDragging(false);
    dragStartedRef.current = false;

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
    isMouseDownRef.current = false;

    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
    dragStartedRef.current = false;
  };

  const slides = [
    <Slide1 key="slide-1" />,
    <Slide2 key="slide-2" isAnimating={isDragging || isTransitioning} />,
    // <Slide3 key="slide-3" />,
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
        className={`relative overflow-hidden select-none shadow-xl ${
          isDragging
            ? "[&_button]:pointer-events-none [&_a]:pointer-events-none"
            : ""
        }`}
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
            <div className="flex gap-2 max-w-5xl pointer-events-auto">
              {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative w-20 py-2 cursor-pointer group"
                >
                  <div className="relative h-1 bg-white/20 rounded-full overflow-hidden group-hover:bg-white/30 transition-colors">
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
                  </div>
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
              transition:
                isDragging || !enableTransition
                  ? "none"
                  : `transform ${TRANSITION_DURATION}ms ease-in-out`,
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

        {/* Pause/Play Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute bottom-0 right-0 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 transition-all duration-200 border-t border-l border-white/20 rounded-tl-2xl"
          aria-label={isPaused ? "Play autoplay" : "Pause autoplay"}
        >
          {isPaused ? (
            <Play className="w-5 h-5" fill="white" />
          ) : (
            <Pause className="w-5 h-5" />
          )}
        </button>
      </section>
    </>
  );
}
