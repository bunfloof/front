"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { AlertTriangle } from "lucide-react";

export function BrandonDoanModal({ isOpen, onClose }: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/imgs/reviewers/brandondoan/ac76540142b81da654f90e7b1a33d9da.webp"
            alt="Brandon Doan"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">
            Brandon Đoàn from{" "}
            <a
              href="https://springracks.com/"
              target="_blank"
              className="text-[#E86D40] hover:text-[#ffb89e] transition-colors"
            >
              SpringRacks Hosting{" "}
            </a>
          </span>
          <span className="text-[#BDE0F5]/50 text-sm">February 5, 2024</span>
        </div>
      </div>
      {/* Bias warning */}
      <div className="flex items-start gap-2 mb-4 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <p className="text-amber-200 text-sm">
          Brandon may be biased because they have never used Foxomy before.
        </p>
      </div>
      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "I would not recommend Foxomy. Their way of operating is interesting and
        since you had issues with customer service with Shockbyte, I don't
        believe you'll get the customer service that you would like from Foxomy.
        Just joining their discord and seeing how their staff behaves and treat
        some of their clients seem pretty unprofessional."
        <br />
        <br />
        They honestly raise a lot of red flags. This subreddit provides a
        verified list of hosting providers in its discord with{" "}
        <a
          href="https://springracks.com/"
          target="_blank"
          className="text-[#E86D40] hover:text-[#ffb89e] transition-colors"
        >
          SpringRacks
        </a>{" "}
        being part of them. I would not recommend going with unknown hosts like
        Foxomy unless they've been verified by the subreddit. Either way, their
        business practices don't seem that ideal for your needs."
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/brandondoan/brandon1121qnotrec.png"
            thumbnail="/imgs/reviewers/brandondoan/brandon1121qnotrec.png"
            width="800"
            height="247"
            alt="Brandon's Reddit review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/brandondoan/brandon1121qnotrec.png"
                  alt="Brandon's Reddit review"
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
          Hi Brandon, thank you for taking the time to review our services.
          We're sorry that you feel this way, and we admit that SpringRacks
          Hosting is superior to us in professionalism and reputation.
        </p>
      </div>
    </ModalWrapper>
  );
}
