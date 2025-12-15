"use client";

import Image from "next/image";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { Gallery, Item } from "react-photoswipe-gallery";
import { AlertTriangle } from "lucide-react";
import "photoswipe/dist/photoswipe.css";

export function OriginsModal({ isOpen, onClose }: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/imgs/reviewers/origins/8dd4b08c67bd0662911c48ca897b3afa.jpeg"
            alt="Origins"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">Origins</span>
          <span className="text-[#BDE0F5]/50 text-sm">January 12, 2025</span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "I use Foxomy, they have reasonable prices if not the best prices that
        I've seen compared to everyone else and their support team is great."
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/origins/Originspr.png"
            thumbnail="/imgs/reviewers/origins/Originspr.png"
            width="2016"
            height="1151"
            alt="Origins's Reddit review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/origins/Originspr.png"
                  alt="Origins's discord review"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </Item>
        </Gallery>
      </div>
    </ModalWrapper>
  );
}
