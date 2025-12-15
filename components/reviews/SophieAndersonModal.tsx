"use client";

import Image from "next/image";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";

export function SophieAndersonModal({
  isOpen,
  onClose,
}: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "Clean panel, fast servers, helpful support. Everything a host should
        be. Five stars if I could give them."
      </p>

      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/avatars/avatar8.png"
            alt="Sophie Anderson"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">
            Sophie Anderson
          </span>
          <span className="text-[#BDE0F5]/50 text-sm">October 2024</span>
        </div>
      </div>

      {/* Source */}
      <div className="pt-4 border-t border-[#1A77AD]/30">
        <span className="text-[#BDE0F5]/50 text-sm">Source: </span>
        <span className="text-sm font-medium text-[#00c4aa]">Trustpilot</span>
      </div>
    </ModalWrapper>
  );
}
