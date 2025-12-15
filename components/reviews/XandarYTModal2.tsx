"use client";

import Image from "next/image";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { Gallery, Item } from "react-photoswipe-gallery";
import { AlertTriangle } from "lucide-react";
import "photoswipe/dist/photoswipe.css";

export function XandarYTModal2({ isOpen, onClose }: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/imgs/reviewers/xandaryt/b70168b897958ab19bfcdcc3390b76e3.png"
            alt="XandarYT"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">
            Aleksandar Kisin from{" "}
            <a
              href="https://stelhosting.com"
              target="_blank"
              className="text-[#7b79ff] hover:text-[#b29dff] transition-colors"
            >
              STEL Hosting
            </a>
          </span>
          <span className="text-[#BDE0F5]/50 text-sm">November 17, 2025</span>
        </div>
      </div>

      {/* Bias warning */}
      <div className="flex items-start gap-2 mb-4 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <p className="text-amber-200 text-sm">
          Aleksandar Kisin may be biased because they have never used Foxomy
          before.
        </p>
      </div>

      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "Yes, it's a host run by a pedophile, that have a condition in their
        terms of service that you can't use it if you are white"
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/xandaryt/xandardisc.png"
            thumbnail="/imgs/reviewers/xandaryt/xandardisc.png"
            width="845"
            height="183"
            alt="XandarYT's Discord review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/xandaryt/xandardisc.png"
                  alt="XandarYT's Discord review"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </Item>
        </Gallery>
      </div>
      {/* Reply from Foxomy */}
      <div className="bg-[#0A2F44] border-l-4 border-[#00db87] p-4 mb-6 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-[#00db87] flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="font-semibold text-[#00db87]">
            Reply from Foxomy
          </span>
        </div>
        <p className="text-[#BDE0F5]/90 text-sm leading-relaxed">
          Hi XandarYT, thank you for sharing your thoughts. We're sorry that you
          think Bun is a pedophile. We have never denied service to white
          people.
        </p>
      </div>
    </ModalWrapper>
  );
}
