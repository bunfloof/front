"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export interface Review {
  name: string;
  avatar: string;
  text: string;
  source?: string;
  date?: string;
}

interface ReviewCardProps {
  review: Review;
  accentColor?: string;
}

function ReviewDialog({
  review,
  isOpen,
  onClose,
  accentColor = "#00c4aa",
}: {
  review: Review;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-[90vw] max-w-lg"
          >
            <div className="bg-[#071F2C] border border-[#1A77AD]/50 p-6 md:p-8 shadow-2xl relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#BDE0F5]/50 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Full review text */}
              <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
                "{review.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: "#0D3A54" }}
                >
                  {review.avatar ? (
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className="font-bold text-lg"
                      style={{ color: accentColor }}
                    >
                      {review.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-semibold text-green-50 block">
                    {review.name}
                  </span>
                  {review.date && (
                    <span className="text-[#BDE0F5]/50 text-sm">
                      {review.date}
                    </span>
                  )}
                </div>
              </div>

              {/* Source */}
              {review.source && (
                <div className="pt-4 border-t border-[#1A77AD]/30">
                  <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: accentColor }}
                  >
                    {review.source}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function ReviewCard({ review, accentColor = "#00c4aa" }: ReviewCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className="flex-shrink-0 w-[350px] md:w-[400px] h-[200px] bg-[#071F2C] border border-[#1A77AD]/30 p-6 mr-6 flex flex-col cursor-pointer hover:border-[#1A77AD]/60 transition-all group relative"
      >
        {/* Expand icon in top right corner */}
        <div className="absolute top-3 right-3 text-[#BDE0F5]/30 group-hover:text-[#BDE0F5]/70 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </div>

        {/* Review text - truncated to 3 lines */}
        <p className="text-[#BDE0F5] leading-relaxed flex-1 line-clamp-3 group-hover:text-[#BDE0F5]/90 transition-colors pr-6">
          "{review.text}"
        </p>

        {/* Author info - always at bottom */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#1A77AD]/20">
          <div className="w-10 h-10 bg-[#0D3A54] overflow-hidden flex items-center justify-center flex-shrink-0">
            {review.avatar ? (
              <Image
                src={review.avatar}
                alt={review.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-sm" style={{ color: accentColor }}>
                {review.name.charAt(0)}
              </span>
            )}
          </div>
          <span className="font-semibold text-green-50 truncate">
            {review.name}
          </span>
        </div>
      </div>

      <ReviewDialog
        review={review}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        accentColor={accentColor}
      />
    </>
  );
}
