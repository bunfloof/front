"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

// Import portfolios and their data
import { BunPortfolio, memberData as bunData } from "./portfolios/BunPortfolio";
import {
  FelixPortfolio,
  memberData as felixData,
} from "./portfolios/FelixPortfolio";
import {
  NovaPortfolio,
  memberData as novaData,
} from "./portfolios/NovaPortfolio";
import { AshPortfolio, memberData as ashData } from "./portfolios/AshPortfolio";
import { CozmoPortfolio, memberData as cozmoData } from "./portfolios/CozmoPortfolio";

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
  felix: FelixPortfolio,
  nova: NovaPortfolio,
  ash: AshPortfolio,
  cozmo: CozmoPortfolio,
};

// Map member IDs to their background colors
const portfolioBackgrounds: Record<string, string> = {
  bun: bunData.portfolioBg,
  felix: felixData.portfolioBg,
  nova: novaData.portfolioBg,
  ash: ashData.portfolioBg,
  cozmo: cozmoData.portfolioBg,
};

// Define departments and their members
const departments: Department[] = [
  {
    id: "support-team",
    name: "Support Team",
    members: [bunData, cozmoData, felixData, novaData, ashData],
  },
  {
    id: "communications",
    name: "Communications Team",
    members: [novaData, ashData, bunData, felixData],
  },
  {
    id: "support",
    name: "Support Team",
    members: [ashData],
  },
  // Add more departments as needed:
  // {
  //   id: "social-media",
  //   name: "Social Media Team",
  //   description: "Managing our presence across social platforms.",
  //   members: [],
  // },
  // {
  //   id: "translation",
  //   name: "Translation Team",
  //   description: "Making Foxomy accessible to everyone around the world.",
  //   members: [],
  // },
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
            Foxomy is run by a group of passionate volunteers who try their best
            to keep the service up and running. Join us to make Foxomy even more
            awesome!
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
