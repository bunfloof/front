"use client";

import Image from "next/image";
import { ModalWrapper, BaseReviewerModalProps } from "./BaseReviewerModal";

export function OliviaThompsonModal({
  isOpen,
  onClose,
}: BaseReviewerModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Review text */}
      <p className="text-[#BDE0F5] leading-relaxed text-lg mb-6 pr-8">
        "Our community server has grown so much thanks to Foxomy's reliable
        hosting. Couldn't ask for better service."
      </p>

      {/* Author info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center bg-[#0D3A54]">
          <Image
            src="/avatars/avatar6.png"
            alt="Olivia Thompson"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-semibold text-green-50 block">
            Olivia Thompson
          </span>
          <span className="text-[#BDE0F5]/50 text-sm">August 2024</span>
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
