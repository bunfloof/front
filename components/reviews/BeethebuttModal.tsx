"use client";

import Image from "next/image";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export function BeethebuttModal({ isOpen, onClose }: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/imgs/reviewers/beebs/b89b0ae73d2ac00bf3b28c58eaaf69b3.jpeg"
            alt="Beethebutt"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">Beethebutt</span>
          <span className="text-[#BDE0F5]/50 text-sm">January 13, 2025</span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "i'm just saying in my whole experience, trying both foxomy and lunes,
        foxomy was way easier to set up than lunes, but more expensive.
        <br />
        <br />
        - if you want to spend less but take more time, use lunes.
        <br />
        - if you want an easy setup but spend a little more, use foxomy. <br />
        <br />
        i'm sure lunes is great but these advertising bots and the lack of
        clarity on the credit system make it unbearable to use.
        <br />
        -- from an actual customer and not a redditor distuised as someone from another host service"
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/beebs/beebslun.png"
            thumbnail="/imgs/reviewers/beebs/beebslun.png"
            width="2016"
            height="1151"
            alt="Beethebutt's review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/beebs/beebslun.png"
                  alt="Beethebutt's review"
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
