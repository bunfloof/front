"use client";

import { ComponentType } from "react";
import { BaseReviewerModalProps } from "./BaseReviewerModal";

// Import all reviewer modals
import { BrandonDoanModal } from "./BrandonDoanModal";
import { BrandonDoanModal2 } from "./BrandonDoanModal2";
import { BrandonDoanModal3 } from "./BrandonDoanModal3";
import { XandarYTModal } from "./XandarYTModal";
import { XandarYTModal2 } from "./XandarYTModal2";
import { TamzModal } from "./TamzModal";
import { GeorgeFloydModal } from "./GeorgeFloydModal";
import { AeonRemnantModal } from "./AeonRemnantModal";
import { OriginsModal } from "./OriginsModal";
import { ExtraTutorModal } from "./ExtraTutorModal";
import { TetModal } from "./TetModal";
import { KaiserModal } from "./KaiserModal";
import { KillermachineModal } from "./KillermachineModal";
import { BeethebuttModal } from "./BeethebuttModal";
import { BlitzModal } from "./BlitzModal";
import { SkataModal } from "./SkataModal";
import { EnucModal } from "./EnucModal";

export { ModalWrapper } from "./BaseReviewerModal";
export type { BaseReviewerModalProps } from "./BaseReviewerModal";

// Map reviewer IDs to their custom modal components
export const reviewerModals: Record<
  string,
  ComponentType<BaseReviewerModalProps>
> = {
  "brandon-doan-1": BrandonDoanModal,
  "brandon-doan-2": BrandonDoanModal2,
  "brandon-doan-3": BrandonDoanModal3,
  blitz: BlitzModal,
  "xandar-yt": XandarYTModal,
  "xandar-yt-2": XandarYTModal2,
  tamz: TamzModal,
  "aeon-remnant": AeonRemnantModal,
  "george-floyd": GeorgeFloydModal,
  origins: OriginsModal,
  "extra-tutor": ExtraTutorModal,
  tet: TetModal,
  kaiser: KaiserModal,
  killermachine_13: KillermachineModal,
  beethebutt: BeethebuttModal,
  skata: SkataModal,
  enucx: EnucModal,
};

// Helper to get the modal component for a reviewer by ID
export function getReviewerModal(
  id: string
): ComponentType<BaseReviewerModalProps> | null {
  return reviewerModals[id] || null;
}
