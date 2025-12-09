"use client";

import { useRef, useState } from "react";
import { ReviewCard, Review } from "./ReviewCard";

// Hater reviews - negative/funny complaints
const haterReviews: Review[] = [
  {
    name: "AngrySteveYT",
    avatar: "/avatars/hater1.png",
    text: "Server was so good I couldn't blame lag for losing anymore. Unacceptable. Had to actually get better at the game.",
    source: "YouTube Comment",
    date: "November 2024",
  },
  {
    name: "LagLover2009",
    avatar: "/avatars/hater2.png",
    text: "Zero ping spikes??? How am I supposed to make excuses to my friends now when I lose a 1v1?",
    source: "Discord",
    date: "October 2024",
  },
  {
    name: "xX_DarkSkull_Xx",
    avatar: "/avatars/hater3.png",
    text: "The uptime is too good. My server was up during my ex's birthday party and I had to moderate instead of touching grass.",
    source: "Reddit",
    date: "September 2024",
  },
  {
    name: "GrieferKing",
    avatar: "/avatars/hater4.png",
    text: "Their anti-DDoS actually works. Now my enemies can't take my server down. This ruined my revenge plans.",
    source: "Twitter/X",
    date: "November 2024",
  },
  {
    name: "BudgetBrian",
    avatar: "/avatars/hater5.png",
    text: "Prices are so low I can't flex on my friends about how much I spend on hosting anymore.",
    source: "Discord",
    date: "October 2024",
  },
  {
    name: "TechNoob99",
    avatar: "/avatars/hater6.png",
    text: "Panel is too easy to use. I used to feel like a hacker setting up my server. Now my grandma could do it.",
    source: "Trustpilot",
    date: "August 2024",
  },
  {
    name: "ProcrastinatorPete",
    avatar: "/avatars/hater7.png",
    text: "Support replied in 3 minutes. I was hoping for a 48 hour wait so I had an excuse not to play.",
    source: "Discord",
    date: "November 2024",
  },
  {
    name: "ChaosCarl",
    avatar: "/avatars/hater8.png",
    text: "My players actually showed up because the server never crashes. Now I have to entertain them. Terrible.",
    source: "Reddit",
    date: "October 2024",
  },
];

export function HatersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...haterReviews, ...haterReviews];

  return (
    <section className="relative py-16 md:py-24 bg-[#030F16] overflow-hidden">
      {/* Scrolling reviews - full width, behind the overlay */}
      <div
        ref={scrollRef}
        className="relative w-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex pl-4 md:pl-8 ${isPaused ? "pause-animation" : ""}`}
          style={{
            animation: "scroll-reverse 40s linear infinite",
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard
              key={`${review.name}-${index}`}
              review={review}
              accentColor="#ff6b6b"
            />
          ))}
        </div>
      </div>

      {/* Hero Overlay - Right aligned with gradient fading to the right */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none bg-gradient-to-l from-[#030F16] from-25% via-[#030F16]/70 via-50% to-transparent to-70%">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 pointer-events-none">
          <div className="ml-auto max-w-lg pointer-events-auto text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-green-50 mb-4">
              What Our Biggest Opps Say
            </h2>
            <p className="text-[#BDE0F5]/70 text-lg">
              Some people just hate furries.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .pause-animation {
          animation-play-state: paused !important;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
