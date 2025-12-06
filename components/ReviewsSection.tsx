"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface Review {
  name: string;
  avatar: string;
  text: string;
}

// Add your reviews here
const reviews: Review[] = [
  {
    name: "Alex Johnson",
    avatar: "/avatars/avatar1.png",
    text: "Foxomy has been incredible for our Minecraft server. The performance is top-notch and the support team is always there when we need them.",
  },
  {
    name: "Sarah Chen",
    avatar: "/avatars/avatar2.png",
    text: "Switched from another host and the difference is night and day. Zero lag, great panel, and the price is unbeatable.",
  },
  {
    name: "Marcus Williams",
    avatar: "/avatars/avatar3.png",
    text: "Been with Foxomy for 2 years now. They've never let me down. The uptime is exactly as advertised.",
  },
  {
    name: "Emma Rodriguez",
    avatar: "/avatars/avatar4.png",
    text: "The custom Pterodactyl panel is amazing. So many features that other hosts don't offer. Highly recommend!",
  },
  {
    name: "James Kim",
    avatar: "/avatars/avatar5.png",
    text: "Support responded in under 5 minutes and solved my issue immediately. This is what good hosting looks like.",
  },
  {
    name: "Olivia Thompson",
    avatar: "/avatars/avatar6.png",
    text: "Our community server has grown so much thanks to Foxomy's reliable hosting. Couldn't ask for better service.",
  },
  {
    name: "Daniel Martinez",
    avatar: "/avatars/avatar7.png",
    text: "The DDoS protection actually works. We got hit hard and didn't even notice any downtime. Impressive.",
  },
  {
    name: "Sophie Anderson",
    avatar: "/avatars/avatar8.png",
    text: "Clean panel, fast servers, helpful support. Everything a host should be. Five stars if I could give them.",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[400px] bg-[#071F2C] border border-[#1A77AD]/30 p-6 mr-6">
      <p className="text-[#BDE0F5] leading-relaxed mb-6">
        "{review.text}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0D3A54] overflow-hidden flex items-center justify-center">
          {review.avatar ? (
            <Image
              src={review.avatar}
              alt={review.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[#00c4aa] font-bold text-sm">
              {review.name.charAt(0)}
            </span>
          )}
        </div>
        <span className="font-semibold text-green-50">{review.name}</span>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 md:py-24 bg-[#030F16] overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-green-50 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-[#BDE0F5]/70 text-lg">
          Don't just take our word for it.
        </p>
      </div>

      {/* Scrolling reviews - full width */}
      <div
        ref={scrollRef}
        className="relative w-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex pl-4 md:pl-8 ${isPaused ? "pause-animation" : ""}`}
          style={{
            animation: "scroll 40s linear infinite",
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
