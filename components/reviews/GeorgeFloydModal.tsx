"use client";

import Image from "next/image";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export function GeorgeFloydModal({ isOpen, onClose }: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/imgs/reviewers/georgefloyd/george.jpg"
            alt="George Floyd"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">
            George Floyd
          </span>
          <span className="text-[#BDE0F5]/50 text-sm">August 15, 2025</span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "The owner of foxomy is a furry pedophile. We left our 7 year old
        daughter and 12 year old son alone at home as we went on our honeymoon.
        Bun broke into our home at 2 AM in his semen stained fursuit and raped
        our children. He raped our daughter. Our daughter is now pregnant. He
        raped our son. Our son has now tested positive for HIV. Bun raped my
        children! My children and wife were traumatized. Please do not let Bun
        near your children."
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/georgefloyd/georgefloyd.png"
            thumbnail="/imgs/reviewers/georgefloyd/georgefloyd.png"
            width="1000"
            height="330"
            alt="George Floyd's Trustpilot review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/georgefloyd/georgefloyd.png"
                  alt="George Floyd's Trustpilot review"
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
          Hi George, thank you for taking the time to review our services. We're sorry that Bun broke into your home and raped your children. This will not happen again.
        </p>
      </div>
    </ModalWrapper>
  );
}
