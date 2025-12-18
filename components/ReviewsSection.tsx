"use client";

import { useRef, useState } from "react";
import { ReviewCard, Review } from "./ReviewCard";
import { motion, AnimatePresence } from "motion/react";

// All reviews - set featured: true for reviews you want in the slider
const reviews: (Review & { featured?: boolean })[] = [
  {
    id: "brandon-doan-1",
    name: "Brandon from SpringRacks Hosting",
    avatar: "/imgs/reviewers/brandondoan/ac76540142b81da654f90e7b1a33d9da.webp",
    text: "I would not recommend Foxomy. Their way of operating is interesting and since you had issues with customer service with Shockbyte, I don't believe you'll get the customer service that you would like from Foxomy. Just joining their discord and seeing how their staff behaves and treat some of their clients seem pretty unprofessional.",
    source: "Reddit",
    date: "February 5, 2024",
    featured: true,
    scrambled: true,
  },

  {
    id: "brandon-doan-3",
    name: "Brandon from SpringRacks Hosting",
    avatar: "/imgs/reviewers/brandondoan/ac76540142b81da654f90e7b1a33d9da.webp",
    text: "Foxomy is definitely a business to avoid. I already knew their service were questionable since they had relations with Lunes Hosting which attacked many other hosting services on X (Formerly Twitter), including mine at SpringRacks as well.",
    source: "Reddit",
    date: "February 6, 2024",
    featured: true,
    scrambled: true,
  },
  {
    id: "george-floyd",
    name: "George Floyd",
    avatar: "/imgs/reviewers/georgefloyd/george.jpg",
    text: "The owner of foxomy is a furry pedophile. We left our 7 year old daughter and 12 year old son alone at home as we went on our honeymoon. Bun broke into our home at 2 AM in his semen stained fursuit and raped our children. He raped our daughter. Our daughter is now pregnant. He raped our son. Our son has now tested positive for HIV. Bun raped my children! My children and wife were traumatized. Please do not let Bun near your children.",
    source: "Trustpilot",
    date: "August 15, 2025",
    featured: true,
    scrambled: true,
  },
  {
    id: "xandar-yt",
    name: "XandarYT from STEL Hosting",
    avatar: "/imgs/reviewers/xandaryt/b70168b897958ab19bfcdcc3390b76e3.png",
    text: "Do not use Foxomy, they are awful. Their Discord is completely unmoderated, they are racist and their owner is even accused of being a pedophile. They also have been accused of DDoSing other hosting providers and constantly cause drama. On top of that, their service isn't very good.",
    source: "Reddit",
    date: "November 17, 2025",
    featured: true,
    scrambled: true,
  },
  {
    id: "brandon-doan-2",
    name: "Brandon from SpringRacks Hosting",
    avatar: "/imgs/reviewers/brandondoan/ac76540142b81da654f90e7b1a33d9da.webp",
    text: "He is associated with Foxomy and his comments to these allegations further proves the unprofessionalism that Foxomy has. We simply wouldn't recommend buying from Foxomy due to some of the red flags that surround their business.",
    source: "Reddit",
    date: "February 6, 2024",
    featured: true,
    scrambled: true,
  },
  {
    id: "xandar-yt-2",
    name: "XandarYT from STEL Hosting",
    avatar: "/imgs/reviewers/xandaryt/b70168b897958ab19bfcdcc3390b76e3.png",
    text: "Yes, it's a host run by a pedophile, that have a condition in their terms of service that you can't use it if you are white",
    source: "Reddit",
    date: "August 9, 2025",
    featured: true,
    scrambled: true,
  },
  {
    id: "tamz",
    name: "Tamz from Admincraft",
    avatar: "/imgs/reviewers/tamz/ea47f55f0b3651f0f7735a7b52ecc17f.jpeg",
    text: "It’s nice to be warned on a host [Foxomy] that fights other hosts, lies about other hosts, proclaims they are the better host, scams their user base, and more.",
    source: "Discord",
    date: "January 12, 2025",
    featured: true,
    scrambled: true,
  },
  {
    id: "aeon-remnant",
    name: "Aeon Remnant from Admincraft",
    avatar: "/imgs/reviewers/aeonremnant/59dde0a31a8bb3dbdc423d1f23dc13e7.jpeg",
    text: "Foxomy is hot garbage, move away from them to any reputable provider. Bloom/Pebblehost/Berrybyte/ServCity/EnviroMC, etc. These are all good. Cancel and refund from Foxomy, move. As for the issue? I didn't answer because I don't use Bedrock because Bedrock is terrible, I wouldn't know why it's fucked. What I do know is hosts, that was my contribution.",
    source: "Reddit",
    date: "January 12, 2025",
    featured: true,
    scrambled: true,
  },
  {
    id: "origins",
    name: "Origins",
    avatar: "/imgs/reviewers/origins/8dd4b08c67bd0662911c48ca897b3afa.jpeg",
    text: "I use Foxomy, they have reasonable prices if not the best prices that I've seen compared to everyone else and their support team is great.",
    source: "Reddit",
    date: "December 14, 2025",
    featured: true,
    scrambled: false,
  },
  {
    id: "extra-tutor",
    name: "Extra_Tutor_6205",
    avatar: "/imgs/reviewers/extratutor/profileIcon_a2idy6vtb6sc1.jpg",
    text: "We use Foxomy for our server and it runs great. They’ve setup crossplay with the combination of GeyserMC and floodgate when we were struggling to set them up, so their support team is awesome.",
    source: "Reddit",
    date: "August 17, 2025",
    featured: true,
    scrambled: false,
  },
  {
    id: "tet",
    name: "Tet",
    avatar: "/imgs/reviewers/tet/d151dbcfc6c14b099e29f6fd53e0601a.jpeg",
    text: "Also in my experience, the sever i got was pretty cheap, works great, (starts and turns off quickly, tps is stable 20 with 272 mods) and someone was able to support me with my server at unnatural hours 1-4am for them. As a customer that sounds too good to be true so for me it’s amazing",
    source: "Discord",
    date: "August 17, 2025",
    featured: true,
    scrambled: false,
  },
  {
    id: "kaiser",
    name: "Kaiser",
    avatar: "/imgs/reviewers/kaiser/61826b6a182b25d6216296a947566318.jpeg",
    text: "server host is running better than 70 dollar host and i got a 100 percent off deal",
    source: "Discord",
    date: "July 19, 2025",
    featured: true,
    scrambled: false,
  },
  {
    id: "skata",
    name: "Skata",
    avatar: "/imgs/reviewers/skata/e0b0fca9421209da6a8828c39af4bd32.jpeg",
    text: "me too and I've been using Foxomy for over a year without any problems 99% of the criticism on Foxomy come from other hosting providers",
    source: "Discord",
    date: "July 19, 2025",
    featured: true,
    scrambled: false,
  },
  {
    id: "killermachine_13",
    name: "Killermachine_13",
    avatar:
      "/imgs/reviewers/killermachine_13/6834ac7316f8f71e20fe5ff772b35277.jpeg",
    text: "I like my budget server, even if I pay a child predator 10 bucks a fucking month uh uhm my money supports foxomy",
    source: "Discord",
    date: "July 23, 2025",
    featured: true,
    scrambled: false,
  },
  {
    id: "beethebutt",
    name: "Beethebutt",
    avatar: "/imgs/reviewers/beebs/b89b0ae73d2ac00bf3b28c58eaaf69b3.jpeg",
    text: "i'm just saying in my whole experience, trying both foxomy and lunes, foxomy was way easier to set up than lunes, but more expensive. if you want to spend less but take more time, use lunes. if you want an easy setup but spend a little more, use foxomy. i'm sure lunes is great but these advertising bots and the lack of clarity on the credit system make it unbearable to use.",
    source: "Discord",
    date: "January 13, 2025",
    featured: true,
    scrambled: false,
  },
  {
    id: "blitz",
    name: "Blitz",
    avatar: "/imgs/reviewers/blitz/ff0644b36e96bb02e0fe1bc44ac5609c.jfif",
    text: "yeah, I highly recommend this host. I don’t care what the owner does or if he’s a furry as long as I get good service and quality. I transferred here from shockbyte and the owner helped me transfer everything in less than 15 minutes.",
    source: "Discord",
    date: "February 26, 2024",
    featured: true,
    scrambled: false,
  },
  {
    id: "enucx",
    name: "Enucx",
    avatar: "/imgs/reviewers/enucx/yJa0GwQo_400x400.jpg",
    text: "Foxomy on top Idc if buns accusations are true He offers me an insanely cheap deal that no other host can offer me",
    source: "Discord",
    date: "June 16, 2025",
    featured: true,
    scrambled: false,
  },
];

// Filter featured reviews for the slider
const featuredReviews = reviews.filter((r) => r.featured);

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Duplicate featured reviews for seamless loop
  const duplicatedReviews = [...featuredReviews, ...featuredReviews];

  return (
    <section className="py-16 md:py-24 bg-[#030F16] overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-green-50 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-[#BDE0F5]/70 text-lg">
          If it's public, it's fair game.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* Expanded grid view */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="columns-1 md:columns-2 lg:columns-4 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="break-inside-avoid mb-6">
                  <ReviewCard
                    review={review}
                    accentColor="#00c4aa"
                    isExpanded={true}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Scrolling slider view */
          <motion.div
            key="slider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={scrollRef}
            className="relative w-full overflow-x-auto reviews-slider"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex pl-4 md:pl-8 ${
                isPaused ? "pause-animation" : ""
              }`}
              style={{
                animation: "scroll 40s linear infinite",
              }}
            >
              {duplicatedReviews.map((review, index) => (
                <ReviewCard
                  key={`${review.id}-${index}`}
                  review={review}
                  accentColor="#00c4aa"
                  isExpanded={false}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show All Reviews button - bottom center */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group flex items-center gap-2 px-6 py-3 border border-[#1A77AD]/50 hover:border-[#00c4aa]/70 bg-[#071F2C] hover:bg-[#0A2A3D] transition-all text-[#BDE0F5] hover:text-[#00c4aa] cursor-pointer"
        >
          <span className="text-sm font-medium">
            {isExpanded ? "Show Less" : "Show All Reviews"}
          </span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
        </button>
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
      `}</style>

      {/* Global style to hide webkit scrollbar */}
      <style jsx global>{`
        .reviews-slider::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
