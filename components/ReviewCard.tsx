"use client";

import { useState } from "react";
import Image from "next/image";
import { getReviewerModal } from "./reviews";
import { ScrambledText } from "@/components/ScrambledText";

export interface Review {
  id: string;
  name: string;
  avatar: string;
  text: string;
  source?: string;
  date?: string;
  scrambled?: boolean;
}

interface ReviewCardProps {
  review: Review;
  accentColor?: string;
  isExpanded?: boolean;
}

export function ReviewCard({
  review,
  accentColor = "#00c4aa",
  isExpanded = false,
}: ReviewCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get custom modal for this reviewer by ID
  const CustomModal = getReviewerModal(review.id);

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className={`bg-[#071F2C] border border-[#1A77AD]/30 p-6 flex flex-col cursor-pointer hover:border-[#1A77AD]/60 transition-all group relative ${
          isExpanded
            ? "w-full h-auto min-h-[200px]"
            : "flex-shrink-0 w-[350px] md:w-[400px] h-[200px] mr-6"
        }`}
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

        {/* Review text - 3 lines for slider, 6 lines for expanded */}
        <p
          className={`text-[#BDE0F5] leading-relaxed flex-1 group-hover:text-[#BDE0F5]/90 transition-colors pr-6 ${
            isExpanded ? "line-clamp-6" : "line-clamp-3"
          }`}
        >
          "
          {review.scrambled ? (
            <ScrambledText>{review.text}</ScrambledText>
          ) : (
            review.text
          )}
          "
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
              <span
                className="font-bold text-sm"
                style={{ color: accentColor }}
              >
                {review.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-green-50 truncate">
              {review.name}
            </span>
            {review.date && (
              <span className="text-xs text-[#BDE0F5]/50">{review.date}</span>
            )}
          </div>
        </div>
      </div>

      {CustomModal && (
        <CustomModal
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}
