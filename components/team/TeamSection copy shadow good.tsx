"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { teamMembers, TeamMember } from "./teamMembers";
import { BunnyPortfolio } from "./portfolios/BunnyPortfolio";
import { FelixPortfolio } from "./portfolios/FelixPortfolio";
import { NovaPortfolio } from "./portfolios/NovaPortfolio";
import { AshPortfolio } from "./portfolios/AshPortfolio";

// Map member IDs to their portfolio components
const portfolioComponents: Record<
  string,
  React.ComponentType<{ member: TeamMember }>
> = {
  bunny: BunnyPortfolio,
  felix: FelixPortfolio,
  nova: NovaPortfolio,
  ash: AshPortfolio,
};

interface TeamMemberCardProps {
  member: TeamMember;
  isSelected: boolean;
  onClick: (cardElement: HTMLButtonElement) => void;
  index: number;
}

function TeamMemberCard({
  member,
  isSelected,
  onClick,
  index,
}: TeamMemberCardProps) {
  return (
    <motion.button
      data-team-card
      data-index={index}
      onClick={(e) => onClick(e.currentTarget)}
      className={`group relative text-left transition-all duration-300 ${
        isSelected ? "z-20" : "z-10"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image container with glow border */}
      <div
        className={`relative w-full aspect-square rounded-xl overflow-hidden mb-4 transition-all duration-300 ${
          isSelected
            ? "shadow-[0_0_0_3px_rgba(0,196,170,0.6),0_0_20px_rgba(0,196,170,0.3)]"
            : "shadow-[0_0_0_3px_rgba(26,119,173,0.3)] group-hover:shadow-[0_0_0_3px_rgba(0,196,170,0.4),0_0_15px_rgba(0,196,170,0.15)]"
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
  member: TeamMember;
  notchPositionX: number;
  onClose: () => void;
}

function CrackWithPortfolio({
  member,
  notchPositionX,
  onClose,
}: CrackWithPortfolioProps) {
  const PortfolioComponent = portfolioComponents[member.id];
  const triangleSize = 20;

  // Create clip-path that includes the triangle notch at the top
  // The triangle points UP, so the portfolio "peeks through" with its own background
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
      className="w-full overflow-visible relative"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        opacity: { duration: 0.2 },
      }}
    >
      {/* Single unified shadow - covers entire crack opening (triangle + horizontal edges) */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: 0,
          height: triangleSize + 40,
          zIndex: 5,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
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

      {/* Portfolio content area with clip-path triangle - background shows through triangle */}
      <motion.div
        className={`relative w-full ${member.portfolioBg || "bg-[#071F2C]"}`}
        style={{
          clipPath,
          paddingTop: triangleSize,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >

        {/* Bottom shadow - creates depth at the bottom edge */}
        <div
          className="absolute left-0 right-0 bottom-0 pointer-events-none z-10"
          style={{
            height: 40,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
          }}
        />

        {/* Close button - floats on top */}
        <button
          onClick={onClose}
          className="absolute top-10 right-4 z-20 p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Portfolio component has full control over its own layout */}
        {PortfolioComponent && <PortfolioComponent member={member} />}
      </motion.div>
    </motion.div>
  );
}

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [notchPositionX, setNotchPositionX] = useState<number>(0);
  const [columnsPerRow, setColumnsPerRow] = useState<number>(4);
  const gridRef = useRef<HTMLDivElement>(null);
  const pendingSelectionRef = useRef<{
    member: TeamMember;
    index: number;
  } | null>(null);

  // Detect columns per row based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 768) {
        setColumnsPerRow(4);
      } else {
        setColumnsPerRow(2);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Recalculate notch position on resize for currently selected member
  useEffect(() => {
    const handleResize = () => {
      if (selectedIndex >= 0 && gridRef.current) {
        // Use data attribute to find only team member cards, not close buttons
        const card = gridRef.current.querySelector(
          `[data-team-card][data-index="${selectedIndex}"]`
        );
        if (card) {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          setNotchPositionX(cardCenterX);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedIndex]);

  // Helper to get card position by index
  const getCardPositionX = (index: number): number => {
    if (gridRef.current) {
      // Use data attribute to find the specific team member card
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

  const handleSelectMember = (
    member: TeamMember,
    index: number,
    cardElement: HTMLButtonElement
  ) => {
    if (selectedMember?.id === member.id) {
      // Clicking same member - close
      setSelectedMember(null);
      setSelectedIndex(-1);
      return;
    }

    const newRow = getRowForIndex(index);
    const currentRow = selectedIndex >= 0 ? getRowForIndex(selectedIndex) : -1;

    if (currentRow !== -1 && currentRow !== newRow) {
      // Switching to a different row - close first, then open after animation
      pendingSelectionRef.current = { member, index };

      setSelectedMember(null);
      setSelectedIndex(-1);

      // Single timer: wait for close animation, then measure and open
      setTimeout(() => {
        if (pendingSelectionRef.current) {
          const { member: pendingMember, index: pendingIndex } =
            pendingSelectionRef.current;

          // Now measure - DOM should be settled
          const positionX = getCardPositionX(pendingIndex);

          setSelectedMember(pendingMember);
          setSelectedIndex(pendingIndex);
          setNotchPositionX(positionX);

          pendingSelectionRef.current = null;
        }
      }, 400); // Wait for close animation to fully complete
    } else {
      // Same row or no portfolio open - immediate position from clicked card
      const cardRect = cardElement.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;

      setSelectedMember(member);
      setSelectedIndex(index);
      setNotchPositionX(cardCenterX);
    }
  };

  const handleClose = () => {
    setSelectedMember(null);
    setSelectedIndex(-1);
  };

  // Group members into rows based on columns per row
  const getRowForIndex = (index: number) => Math.floor(index / columnsPerRow);
  const selectedRow = selectedIndex >= 0 ? getRowForIndex(selectedIndex) : -1;

  // Split members into rows
  const rows: TeamMember[][] = [];
  for (let i = 0; i < teamMembers.length; i += columnsPerRow) {
    rows.push(teamMembers.slice(i, i + columnsPerRow));
  }

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
            {/* <div className="w-10 h-[3px] accent-line-gradient" /> */}
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

        {/* Team Grid with rows and inline crack insertion */}
        <div ref={gridRef}>
          {rows.map((rowMembers, rowIndex) => (
            <div key={rowIndex}>
              {/* Row of cards */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {rowMembers.map((member, indexInRow) => {
                    const globalIndex = rowIndex * columnsPerRow + indexInRow;
                    return (
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        isSelected={selectedMember?.id === member.id}
                        onClick={(cardEl) =>
                          handleSelectMember(member, globalIndex, cardEl)
                        }
                        index={globalIndex}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Crack appears right after this row if a member from this row is selected */}
              <AnimatePresence>
                {selectedRow === rowIndex && selectedMember && (
                  <div className="mt-6">
                    <CrackWithPortfolio
                      member={selectedMember}
                      notchPositionX={notchPositionX}
                      onClose={handleClose}
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Spacing between rows (only if no crack is showing after this row) */}
              {selectedRow !== rowIndex && rowIndex < rows.length - 1 && (
                <div className="h-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
