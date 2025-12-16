"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { AlertTriangle } from "lucide-react";

export function BrandonDoanModal3({ isOpen, onClose }: BaseReviewerModalProps) {
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
          Brandon Đoàn may be biased because they have never used Foxomy before.
        </p>
      </div>
      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "I've never looked through their TOS, but for their TOS to include that
        is truly mind-boggling. I already knew their service were questionable
        since they had relations with Lunes Hosting which attacked many other
        hosting services on X (Formerly Twitter) which would include mine at{" "}
        <a
          href="https://springracks.com/"
          target="_blank"
          className="text-[#E86D40] hover:text-[#ffb89e] transition-colors"
        >
          SpringRacks
        </a>{" "}
        as well. I also found it weird that they would include political
        affiliation in their comparison chart as if it's an important thing for
        people outside the US or even clients in general to care about.
        <br />
        <br />
        It's definitely a business to avoid.
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/brandondoan/brandon1121avoi.png"
            thumbnail="/imgs/reviewers/brandondoan/brandon1121avoi.png"
            width="800"
            height="303"
            alt="Brandon's Reddit review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/brandondoan/brandon1121avoi.png"
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
          Hi Brandon, thank you for sharing your thoughts. We're sorry our TOS
          offended you. White people can and do use our services, but the focus
          for Foxomy is providing a safe and supportive environment for people
          of color. Regarding Lunes Hosting, Foxomy operates independently and
          is not responsible for the actions of other hosting companies,
          including Lunes Hosting. We've never attacked your host either because
          you're a small fry not worth our time. Regarding our comparison chart,
          we included various data points that some users found interesting.
          We're sorry if you feel offended by our TOS or comparison chart.
        </p>
      </div>
    </ModalWrapper>
  );
}
