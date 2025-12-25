"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { AlertTriangle } from "lucide-react";

export function BrandonDoanModal2({ isOpen, onClose }: BaseReviewerModalProps) {
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
        "Remember, discord messages can be purged so whether my allegations to
        their unprofessionalism in their discord is true or not is up to you to
        decide."
        <br />
        <br />
        What is for certain is their TOS clearly stating only a specific
        group/race can use their services which itself is concerning. As some
        who is of the Asian too and would still qualify for their services, it
        truly disturbs me that they would deny service if they found out you
        weren’t the race they desired.
        <br />
        <br />
        It’s your money and your decision to go with them or not. If you check
        this person's post history, he is affiliated with Foxomy and his
        comments to these allegations further proves the unprofessionalism the
        host has. Whether he is a customer or a staff is also up to you to
        decide. No one is stopping you from buying from them. We simply wouldn’t
        recommend buying from Foxomy due to some of the red flags that surround
        their business."
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/brandondoan/brandon1121qunp.png"
            thumbnail="/imgs/reviewers/brandondoan/brandon1121qunp.png"
            width="973"
            height="503"
            alt="Brandon's Reddit review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/brandondoan/brandon1121qunp.png"
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
          Hi Brandon, thank you for sharing your concerns. First of all, please
          use gender neutral pronouns and do not misgender our customers. We do
          not remove any sort of opinions, negative or positive, against Foxomy
          in our Discord server. Transparency is more important to us than
          having good looks. Our focus is on creating a supportive environment
          for minorities, but we do not deny service based on race. We
          appreciate the feedback, we admit that your host SpringRacks Hosting
          is more professional than us.
        </p>
      </div>
    </ModalWrapper>
  );
}
