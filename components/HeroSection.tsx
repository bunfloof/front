"use client";
import { useState, useEffect } from "react";
import { Slide1 } from "@/components/slides/Slide1";
import { Slide2 } from "@/components/slides/Slide2";
import { Slide3 } from "@/components/slides/Slide3";

const TOTAL_SLIDES = 3;
const SLIDE_DURATION = 10000; // 10 seconds

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % TOTAL_SLIDES);
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION / 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <Slide1 />;
      case 1:
        return <Slide2 />;
      case 2:
        return <Slide3 />;
      default:
        return <Slide1 />;
    }
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden pt-20">
        {/* Progress Indicator - Absolute positioned at top left */}
        <div className="absolute top-24 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 max-w-5xl">
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

        {/* Render current slide */}
        {renderSlide()}
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
