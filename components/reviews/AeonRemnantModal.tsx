"use client";

import Image from "next/image";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";
import { Gallery, Item } from "react-photoswipe-gallery";
import { AlertTriangle } from "lucide-react";
import "photoswipe/dist/photoswipe.css";

export function AeonRemnantModal({ isOpen, onClose }: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/imgs/reviewers/aeonremnant/59dde0a31a8bb3dbdc423d1f23dc13e7.jpeg"
            alt="Aeon Remnant"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">
            Aeon Remnant from Admincraft
          </span>
          <span className="text-[#BDE0F5]/50 text-sm">January 12, 2025</span>
        </div>
      </div>

      {/* Bias warning */}
      <div className="flex items-start gap-2 mb-4 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <p className="text-amber-200 text-sm">
          Aeon Remnant may be biased because they have never used Foxomy before.
        </p>
      </div>

      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "Foxomy is hot garbage, move away from them to any reputable provider.
        <br />
        Bloom/Pebblehost/Berrybyte/ServCity/EnviroMC, etc. <br />
        These are all good. <br />
        Cancel and refund from Foxomy, move. <br />
        As for the issue? I didn't answer because I don't use Bedrock because
        Bedrock is terrible, I wouldn't know why it's fucked.
        <br />
        <br />
        What I do know is hosts, that was my contribution."
      </p>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        </div>
        <Gallery>
          <Item
            original="/imgs/reviewers/aeonremnant/AeonRemnanthotgar.png"
            thumbnail="/imgs/reviewers/aeonremnant/AeonRemnanthotgar.png"
            width="2016"
            height="1151"
            alt="Aeon Remnant's Reddit review"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="aspect-square w-32 cursor-pointer rounded-lg overflow-hidden border border-[#1A77AD]/30 hover:border-[#1A77AD]/60 transition-colors"
              >
                <img
                  src="/imgs/reviewers/aeonremnant/AeonRemnanthotgar.png"
                  alt="Aeon Remnant's discord review"
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
          Hi Aeon, thank you for taking the time to review our services. We admit that we're "hot garbage" according to you. We're sorry that you feel this way.
        </p>
      </div>
    </ModalWrapper>
  );
}
