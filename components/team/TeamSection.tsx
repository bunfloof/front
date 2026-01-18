"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

// Import portfolios and their data
import { BunPortfolio, memberData as bunData } from "./portfolios/BunPortfolio";

import {
  CozmoPortfolio,
  memberData as cozmoData,
} from "./portfolios/CozmoPortfolio";

// Backend Team
import {
  CrabPortfolio,
  memberData as crabData,
} from "./portfolios/CrabPortfolio";
import {
  EnochPortfolio,
  memberData as enochData,
} from "./portfolios/EnochPortfolio";
import {
  HaloPortfolio,
  memberData as haloData,
} from "./portfolios/HaloPortfolio";
import {
  KobiPortfolio,
  memberData as kobiData,
} from "./portfolios/KobiPortfolio";
import {
  MrW4vePortfolio,
  memberData as mrw4veData,
} from "./portfolios/MrW4vePortfolio";
import {
  NxifyPortfolio,
  memberData as nxifyData,
} from "./portfolios/NxifyPortfolio";

// Business Team
import {
  CheesePortfolio,
  memberData as cheeseData,
} from "./portfolios/CheesePortfolio";
import {
  DavidTuckerPortfolio,
  memberData as davidtuckerData,
} from "./portfolios/DavidTuckerPortfolio";
import {
  IlomantisPortfolio,
  memberData as ilomantisData,
} from "./portfolios/IlomantisPortfolio";

// Communications Team
import {
  ZolomightPortfolio,
  memberData as zolomightData,
} from "./portfolios/ZolomightPortfolio";

// Creative Team
import {
  BrokenSunPortfolio,
  memberData as brokensunData,
} from "./portfolios/BrokenSunPortfolio";
import {
  DovesongPortfolio,
  memberData as dovesongData,
} from "./portfolios/DovesongPortfolio";
import {
  FeliixPortfolio,
  memberData as feliixData,
} from "./portfolios/FeliixPortfolio";

import {
  RealakimPortfolio,
  memberData as realakimData,
} from "./portfolios/RealakimPortfolio";
import {
  VicMcPheronPortfolio,
  memberData as vicmcpheronData,
} from "./portfolios/VicMcPheronPortfolio";

// Development Team
import {
  LemonPortfolio,
  memberData as lemonData,
} from "./portfolios/LemonPortfolio";

// Finance Team
import {
  TiteiikoPortfolio,
  memberData as titeiikoData,
} from "./portfolios/TiteiikoPortfolio";
import {
  TofuPortfolio,
  memberData as tofuData,
} from "./portfolios/TofuPortfolio";

// Frontend Team
import {
  TaiNgoPortfolio,
  memberData as taingoData,
} from "./portfolios/TaiNgoPortfolio";
import {
  LittlemadhatterPortfolio,
  memberData as littlemadhatterData,
} from "./portfolios/LittlemadhatterPortfolio";

// Graphics Team
import {
  DekuPortfolio,
  memberData as dekuData,
} from "./portfolios/DekuPortfolio";
import {
  GrayDay78Portfolio,
  memberData as grayday78Data,
} from "./portfolios/GrayDay78Portfolio";

// HR Team
import {
  KaylaPortfolio,
  memberData as kaylaData,
} from "./portfolios/KaylaPortfolio";
import {
  PapatonydeepPortfolio,
  memberData as papatonydeepData,
} from "./portfolios/PapatonydeepPortfolio";

// Local Team
import {
  BenjaminCarterPortfolio,
  memberData as benjamincarterData,
} from "./portfolios/BenjaminCarterPortfolio";
import {
  FlyingDraegonPortfolio,
  memberData as flyingdraegonData,
} from "./portfolios/FlyingDraegonPortfolio";
import {
  GuruduruPortfolio,
  memberData as guruduruData,
} from "./portfolios/GuruduruPortfolio";
import { PooPortfolio, memberData as pooData } from "./portfolios/PooPortfolio";

// Marketing Team
import {
  SolidSMMPortfolio,
  memberData as solidsmmData,
} from "./portfolios/SolidSMMPortfolio";
import {
  GraysonGorneyPortfolio,
  memberData as graysongorneyData,
} from "./portfolios/GraysonGorneyPortfolio";

// Moderation Team
import {
  DanielPortfolio,
  memberData as danielData,
} from "./portfolios/DanielPortfolio";
import {
  SkylerAcerPortfolio,
  memberData as skyleracerData,
} from "./portfolios/SkylerAcerPortfolio";

// Partners Team
import {
  CuyoyaPortfolio,
  memberData as cuyoyaData,
} from "./portfolios/CuyoyaPortfolio";
import { ShyPortfolio, memberData as shyData } from "./portfolios/ShyPortfolio";
import {
  ThatKyrgyzPortfolio,
  memberData as thatkyrgyzData,
} from "./portfolios/ThatKyrgyzPortfolio";

// PR Team
import {
  AllitariPortfolio,
  memberData as allitariData,
} from "./portfolios/AllitariPortfolio";
import {
  GoldiePortfolio,
  memberData as goldieData,
} from "./portfolios/GoldiePortfolio";

// Social Media Team
import {
  AyasuPortfolio,
  memberData as ayasuData,
} from "./portfolios/AyasuPortfolio";

// Support Team
import {
  TrishPortfolio,
  memberData as trishData,
} from "./portfolios/TrishPortfolio";

// Types
interface TeamMember {
  id: string;
  name: string;
  role: string;
  handle: string;
  avatar: string;
  portfolioBg?: string;
}

interface Department {
  id: string;
  name: string;
  members: TeamMember[];
}

// Map member IDs to their portfolio components
const portfolioComponents: Record<string, React.ComponentType> = {
  bun: BunPortfolio,
  feliix: FeliixPortfolio,
  cozmo: CozmoPortfolio,
  // Backend Team
  crab: CrabPortfolio,
  enoch: EnochPortfolio,
  kobi: KobiPortfolio,
  halo: HaloPortfolio,
  mrw4ve: MrW4vePortfolio,
  nxify: NxifyPortfolio,
  // Business Team
  cheese: CheesePortfolio,
  davidtucker: DavidTuckerPortfolio,
  ilomantis: IlomantisPortfolio,
  // Communications Team
  zolomight: ZolomightPortfolio,
  // Creative Team
  brokensun: BrokenSunPortfolio,
  dovesong: DovesongPortfolio,
  realakim: RealakimPortfolio,
  vicmcpheron: VicMcPheronPortfolio,
  // Development Team
  lemon: LemonPortfolio,
  // Finance Team
  titeiiko: TiteiikoPortfolio,
  tofu: TofuPortfolio,
  // Frontend Team
  taingo: TaiNgoPortfolio,
  littlemadhatter: LittlemadhatterPortfolio,
  // Graphics Team
  deku: DekuPortfolio,
  grayday78: GrayDay78Portfolio,
  // HR Team
  kayla: KaylaPortfolio,
  papatonydeep: PapatonydeepPortfolio,
  // Local Team
  benjamincarter: BenjaminCarterPortfolio,
  flyingdraegon: FlyingDraegonPortfolio,
  guruduru: GuruduruPortfolio,
  poo: PooPortfolio,
  // Marketing Team
  solidsmm: SolidSMMPortfolio,
  graysongorney: GraysonGorneyPortfolio,
  // Moderation Team
  daniel: DanielPortfolio,
  skyleracer: SkylerAcerPortfolio,
  // Partners Team
  cuyoya: CuyoyaPortfolio,
  shy: ShyPortfolio,
  thatkyrgyz: ThatKyrgyzPortfolio,
  // PR Team
  allitari: AllitariPortfolio,
  goldie: GoldiePortfolio,
  // Social Media Team
  ayasu: AyasuPortfolio,
  // Support Team
  trish: TrishPortfolio,
};

// Map member IDs to their background colors
const portfolioBackgrounds: Record<string, string> = {
  bun: bunData.portfolioBg,
  cozmo: cozmoData.portfolioBg,
  // Backend Team
  crab: crabData.portfolioBg,
  enoch: enochData.portfolioBg,
  halo: haloData.portfolioBg,
  kobi: kobiData.portfolioBg,
  mrw4ve: mrw4veData.portfolioBg,
  nxify: nxifyData.portfolioBg,
  // Business Team
  cheese: cheeseData.portfolioBg,
  ilomantis: ilomantisData.portfolioBg,
  // Communications Team
  zolomight: zolomightData.portfolioBg,
  // Creative Team
  brokensun: brokensunData.portfolioBg,
  dovesong: dovesongData.portfolioBg,
  feliix: feliixData.portfolioBg,
  realakim: realakimData.portfolioBg,
  vicmcpheron: vicmcpheronData.portfolioBg,
  // Development Team
  lemon: lemonData.portfolioBg,
  // Finance Team
  titeiiko: titeiikoData.portfolioBg,
  tofu: tofuData.portfolioBg,
  // Frontend Team
  taingo: taingoData.portfolioBg,
  littlemadhatter: littlemadhatterData.portfolioBg,
  // Graphics Team
  deku: dekuData.portfolioBg,
  grayday78: grayday78Data.portfolioBg,
  // HR Team
  kayla: kaylaData.portfolioBg,
  papatonydeep: papatonydeepData.portfolioBg,
  // Local Team
  benjamincarter: benjamincarterData.portfolioBg,
  flyingdraegon: flyingdraegonData.portfolioBg,
  guruduru: guruduruData.portfolioBg,
  poo: pooData.portfolioBg,
  // Marketing Team
  solidsmm: solidsmmData.portfolioBg,
  graysongorney: graysongorneyData.portfolioBg,
  // Moderation Team
  daniel: danielData.portfolioBg,
  skyleracer: skyleracerData.portfolioBg,
  // Partners Team
  cuyoya: cuyoyaData.portfolioBg,
  shy: shyData.portfolioBg,
  thatkyrgyz: thatkyrgyzData.portfolioBg,
  // PR Team
  allitari: allitariData.portfolioBg,
  goldie: goldieData.portfolioBg,
  // Social Media Team
  ayasu: ayasuData.portfolioBg,
  // Support Team
  trish: trishData.portfolioBg,
};

// Define departments and their members
const departments: Department[] = [
  {
    id: "backend",
    name: "Backend Team",
    members: [crabData, enochData, haloData, kobiData, mrw4veData, nxifyData],
  },
  {
    id: "business",
    name: "Business Team",
    members: [cheeseData, davidtuckerData, ilomantisData],
  },
  {
    id: "communications",
    name: "Communications Team",
    members: [zolomightData],
  },
  {
    id: "creative",
    name: "Creative Team",
    members: [
      brokensunData,
      dovesongData,
      feliixData,
      realakimData,
      vicmcpheronData,
    ],
  },
  {
    id: "development",
    name: "Development Team",
    members: [lemonData],
  },
  {
    id: "finance",
    name: "Finance Team",
    members: [titeiikoData, tofuData],
  },
  {
    id: "frontend",
    name: "Frontend Team",
    members: [taingoData, littlemadhatterData],
  },
  {
    id: "graphics",
    name: "Graphics Team",
    members: [dekuData, grayday78Data],
  },
  {
    id: "hr",
    name: "HR Team",
    members: [kaylaData, papatonydeepData],
  },
  {
    id: "local",
    name: "Local Team",
    members: [
      benjamincarterData,
      bunData,
      cozmoData,
      flyingdraegonData,
      guruduruData,
      pooData,
    ],
  },
  {
    id: "marketing",
    name: "Marketing Team",
    members: [solidsmmData, graysongorneyData],
  },
  {
    id: "moderation",
    name: "Discord Moderation Team",
    members: [danielData, skyleracerData],
  },
  {
    id: "partners",
    name: "Partners Team",
    members: [cuyoyaData, shyData, thatkyrgyzData],
  },
  {
    id: "pr",
    name: "PR Team",
    members: [allitariData, goldieData],
  },
  {
    id: "social-media",
    name: "Social Media Team",
    members: [ayasuData],
  },
  {
    id: "support",
    name: "Support Team",
    members: [trishData],
  },
];

interface TeamMemberCardProps {
  member: TeamMember;
  isSelected: boolean;
  onClick: (cardElement: HTMLButtonElement) => void;
  globalIndex: number;
}

function TeamMemberCard({
  member,
  isSelected,
  onClick,
  globalIndex,
}: TeamMemberCardProps) {
  return (
    <motion.button
      data-team-card
      data-index={globalIndex}
      onClick={(e) => onClick(e.currentTarget)}
      className={`group relative text-left ${isSelected ? "z-20" : "z-10"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: globalIndex * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      style={{ cursor: "pointer" }}
    >
      {/* Image container with glow border */}
      <div
        className={`relative w-full aspect-square rounded-xl overflow-hidden mb-4 ${
          isSelected
            ? "ring-[3px] ring-[#00c4aa]/60"
            : "ring-[3px] ring-[#1A77AD]/30 group-hover:ring-[#00c4aa]/40"
        }`}
      >
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-[#00c4aa]/0 group-hover:bg-[#00c4aa]/10 transition-colors duration-300" />
      </div>

      {/* Text info below image */}
      <div>
        <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
        <p className="text-[#7AC2EB]/80 text-sm mb-1">{member.role}</p>
        <p className="text-[#1A77AD]/60 text-sm">{member.handle}</p>
      </div>
    </motion.button>
  );
}

interface CrackWithPortfolioProps {
  memberId: string;
  portfolioBg: string;
  notchPositionX: number;
  onClose: () => void;
}

function CrackWithPortfolio({
  memberId,
  portfolioBg,
  notchPositionX,
  onClose,
}: CrackWithPortfolioProps) {
  const PortfolioComponent = portfolioComponents[memberId];
  const triangleSize = 20;

  // Create clip-path that includes the triangle notch at the top
  const clipPath = `polygon(
    0% ${triangleSize}px,
    ${notchPositionX - triangleSize}px ${triangleSize}px,
    ${notchPositionX}px 0%,
    ${notchPositionX + triangleSize}px ${triangleSize}px,
    100% ${triangleSize}px,
    100% 100%,
    0% 100%
  )`;

  return (
    <motion.div
      className="w-full overflow-visible relative grid"
      initial={{ gridTemplateRows: "0fr", opacity: 0 }}
      animate={{ gridTemplateRows: "1fr", opacity: 1 }}
      exit={{ gridTemplateRows: "0fr", opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Wrapper for grid animation */}
      <div className="overflow-hidden min-h-0">
        {/* Top shadow */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: 0,
            height: triangleSize + 40,
            zIndex: 5,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
            clipPath: `polygon(
              0% ${triangleSize}px,
              ${notchPositionX - triangleSize}px ${triangleSize}px,
              ${notchPositionX}px 0%,
              ${notchPositionX + triangleSize}px ${triangleSize}px,
              100% ${triangleSize}px,
              100% 100%,
              0% 100%
            )`,
          }}
        />

        {/* Portfolio content area */}
        <div
          className={`relative w-full ${portfolioBg || "bg-[#071F2C]"}`}
          style={{
            clipPath,
            paddingTop: triangleSize,
          }}
        >
          {/* Bottom shadow */}
          <div
            className="absolute left-0 right-0 bottom-0 pointer-events-none z-10"
            style={{
              height: 40,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-10 right-4 z-20 p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Portfolio component */}
          {PortfolioComponent && <PortfolioComponent />}
        </div>
      </div>
    </motion.div>
  );
}

interface DepartmentSectionProps {
  department: Department;
  globalIndexStart: number;
  selectedMemberId: string | null;
  selectedGlobalIndex: number;
  notchPositionX: number;
  columnsPerRow: number;
  onSelectMember: (
    member: TeamMember,
    globalIndex: number,
    cardEl: HTMLButtonElement
  ) => void;
  onClose: () => void;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

function DepartmentSection({
  department,
  globalIndexStart,
  selectedMemberId,
  selectedGlobalIndex,
  notchPositionX,
  columnsPerRow,
  onSelectMember,
  onClose,
  gridRef,
}: DepartmentSectionProps) {
  // Don't render empty departments
  if (department.members.length === 0) return null;

  // Split members into rows
  const rows: TeamMember[][] = [];
  for (let i = 0; i < department.members.length; i += columnsPerRow) {
    rows.push(department.members.slice(i, i + columnsPerRow));
  }

  // Calculate which row the selected member is in (if in this department)
  const getLocalRow = (globalIndex: number) => {
    const localIndex = globalIndex - globalIndexStart;
    if (localIndex < 0 || localIndex >= department.members.length) return -1;
    return Math.floor(localIndex / columnsPerRow);
  };

  const selectedLocalRow =
    selectedGlobalIndex >= 0 ? getLocalRow(selectedGlobalIndex) : -1;
  const selectedMember = department.members.find(
    (m) => m.id === selectedMemberId
  );

  return (
    <div className="mb-16">
      {/* Department Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-[2px] bg-gradient-to-r from-[#00c4aa] to-[#1A77AD]" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {department.name}
          </h2>
        </div>
      </div>

      {/* Members Grid */}
      <div ref={gridRef}>
        {rows.map((rowMembers, rowIndex) => {
          const rowStartIndex = globalIndexStart + rowIndex * columnsPerRow;

          return (
            <div key={rowIndex}>
              {/* Row of cards */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {rowMembers.map((member, indexInRow) => {
                    const globalIndex = rowStartIndex + indexInRow;
                    return (
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        isSelected={selectedMemberId === member.id}
                        onClick={(cardEl) =>
                          onSelectMember(member, globalIndex, cardEl)
                        }
                        globalIndex={globalIndex}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Crack appears after this row if a member from this row is selected */}
              <AnimatePresence>
                {selectedLocalRow === rowIndex && selectedMember && (
                  <div className="mt-2 mb-6">
                    <CrackWithPortfolio
                      memberId={selectedMember.id}
                      portfolioBg={portfolioBackgrounds[selectedMember.id]}
                      notchPositionX={notchPositionX}
                      onClose={onClose}
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Spacing between rows */}
              {selectedLocalRow !== rowIndex && rowIndex < rows.length - 1 && (
                <div className="h-6" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TeamSection() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedGlobalIndex, setSelectedGlobalIndex] = useState<number>(-1);
  const [notchPositionX, setNotchPositionX] = useState<number>(0);
  const [columnsPerRow, setColumnsPerRow] = useState<number>(4);
  const gridRef = useRef<HTMLDivElement>(null);
  const pendingSelectionRef = useRef<{
    memberId: string;
    globalIndex: number;
  } | null>(null);

  // Calculate global index ranges for each department
  const departmentRanges = departments.reduce<{ start: number; end: number }[]>(
    (acc, dept) => {
      const start = acc.length > 0 ? acc[acc.length - 1].end : 0;
      const end = start + dept.members.length;
      acc.push({ start, end });
      return acc;
    },
    []
  );

  // Detect columns per row based on screen size
  useEffect(() => {
    const updateColumns = () => {
      setColumnsPerRow(window.innerWidth >= 768 ? 4 : 2);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Recalculate notch position on resize
  useEffect(() => {
    const handleResize = () => {
      if (selectedGlobalIndex >= 0 && gridRef.current) {
        const card = gridRef.current.querySelector(
          `[data-team-card][data-index="${selectedGlobalIndex}"]`
        );
        if (card) {
          const cardRect = card.getBoundingClientRect();
          setNotchPositionX(cardRect.left + cardRect.width / 2);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedGlobalIndex]);

  const getCardPositionX = (index: number): number => {
    if (gridRef.current) {
      const card = gridRef.current.querySelector(
        `[data-team-card][data-index="${index}"]`
      );
      if (card) {
        const rect = card.getBoundingClientRect();
        return rect.left + rect.width / 2;
      }
    }
    return 0;
  };

  // Find which department and row a global index belongs to
  const getDepartmentAndRow = (globalIndex: number) => {
    for (let i = 0; i < departments.length; i++) {
      const { start, end } = departmentRanges[i];
      if (globalIndex >= start && globalIndex < end) {
        const localIndex = globalIndex - start;
        return { deptIndex: i, row: Math.floor(localIndex / columnsPerRow) };
      }
    }
    return { deptIndex: -1, row: -1 };
  };

  const handleSelectMember = (
    member: TeamMember,
    globalIndex: number,
    cardElement: HTMLButtonElement
  ) => {
    if (selectedMemberId === member.id) {
      // Clicking same member - close
      setSelectedMemberId(null);
      setSelectedGlobalIndex(-1);
      return;
    }

    const newPos = getDepartmentAndRow(globalIndex);
    const currentPos =
      selectedGlobalIndex >= 0
        ? getDepartmentAndRow(selectedGlobalIndex)
        : { deptIndex: -1, row: -1 };

    const isSameRow =
      currentPos.deptIndex === newPos.deptIndex &&
      currentPos.row === newPos.row;

    if (currentPos.deptIndex !== -1 && !isSameRow) {
      // Switching to a different row/department - close first, then open
      pendingSelectionRef.current = { memberId: member.id, globalIndex };

      setSelectedMemberId(null);
      setSelectedGlobalIndex(-1);

      setTimeout(() => {
        if (pendingSelectionRef.current) {
          const { memberId, globalIndex: idx } = pendingSelectionRef.current;
          const positionX = getCardPositionX(idx);

          setSelectedMemberId(memberId);
          setSelectedGlobalIndex(idx);
          setNotchPositionX(positionX);

          pendingSelectionRef.current = null;
        }
      }, 400);
    } else {
      // Same row or no portfolio open
      const cardRect = cardElement.getBoundingClientRect();
      setSelectedMemberId(member.id);
      setSelectedGlobalIndex(globalIndex);
      setNotchPositionX(cardRect.left + cardRect.width / 2);
    }
  };

  const handleClose = () => {
    setSelectedMemberId(null);
    setSelectedGlobalIndex(-1);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030F16]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Gradient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -right-40 top-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,196,170,0.5) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -left-40 bottom-1/4 w-[350px] h-[350px] rounded-full blur-3xl opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, rgba(4,129,205,0.5) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 py-20 md:py-28">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[3px] accent-line-gradient" />
            <span className="text-[#00c4aa] text-sm font-semibold tracking-wide uppercase">
              Our Team
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Meet the Pack
          </h1>
          <p className="text-[#BDE0F5]/70 text-lg max-w-3xl">
            Foxomy is run by a small group of passionate volunteers who try
            their best to keep the service up and running. Click on a team
            member to learn more about them.
          </p>
        </div>

        {/* Team Departments */}
        <div ref={gridRef}>
          {departments.map((department, deptIndex) => (
            <DepartmentSection
              key={department.id}
              department={department}
              globalIndexStart={departmentRanges[deptIndex].start}
              selectedMemberId={selectedMemberId}
              selectedGlobalIndex={selectedGlobalIndex}
              notchPositionX={notchPositionX}
              columnsPerRow={columnsPerRow}
              onSelectMember={handleSelectMember}
              onClose={handleClose}
              gridRef={gridRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
