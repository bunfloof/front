"use client";

import Image from "next/image";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { Gallery, Item } from "react-photoswipe-gallery";
import { AlertTriangle } from "lucide-react";
import "photoswipe/dist/photoswipe.css";

export function ExtraTutorModal({ isOpen, onClose }: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/imgs/reviewers/extratutor/profileIcon_a2idy6vtb6sc1.jpg"
            alt="Extra Tutor"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">
            Extra_Tutor_6205
          </span>
          <span className="text-[#BDE0F5]/50 text-sm">August 17, 2025</span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "We use Foxomy for our server and it runs great. They’ve setup crossplay
        with the combination of GeyserMC and floodgate when we were struggling
        to set them up, so their support is awesome. I got no cons for them
        because my experience has been all pros so far."
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/extratutor/extratut.png"
            thumbnail="/imgs/reviewers/extratutor/extratut.png"
            width="1504"
            height="954"
            alt="Extra Tutor's review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/extratutor/extratut.png"
                  alt="Extra Tutor's review"
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
