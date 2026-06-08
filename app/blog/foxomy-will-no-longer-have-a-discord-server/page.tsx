"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2, Check, Bookmark } from "lucide-react";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

export default function FoxomyNoLongerHaveDiscordPost() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--themed-bg)" }}
    >
      <ThemedNavbar />

      {/* Header */}
      <header
        className="pt-32 pb-12 border-b transition-colors duration-300"
        style={{ borderColor: "var(--themed-border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:opacity-70"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-mono">cd /blog</span>
          </Link>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-6 leading-tight transition-colors duration-300"
            style={{ color: "var(--themed-heading)" }}
          >
            Foxomy Will No Longer Have a Discord Server
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center text-md transition-colors duration-300"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {/* TODO: set your publish date */}
              June 8, 2026
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              {/* TODO: swap author image + name to match your other posts */}
              <Image
                src="/imgs/portfolios/cozmo/nCBGCW68_400x400.jpg"
                alt="Author"
                width={20}
                height={20}
                className="rounded-full object-cover"
              />{" "}
              Cozmo
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              Social Media
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 transition-colors cursor-pointer hover:opacity-80"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Share
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div
              className="leading-relaxed space-y-6 transition-colors duration-300"
              style={{ color: "var(--themed-text)" }}
            >
              <Gallery>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/Group1lowendtalk.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/Group1lowendtalk.png"
                  width="1343"
                  height="788"
                  alt="Lowendtalk comments"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/Group1lowendtalk.png"
                        alt="Lowendtalk comments"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <blockquote
                className="my-6 pl-5 pr-5 py-4 border-l-2 transition-colors duration-300"
                style={{
                  borderColor: "var(--themed-accent)",
                  backgroundColor: "var(--themed-nav-hover)",
                }}
              >
                <p
                  className="text-md italic leading-relaxed"
                  style={{ color: "var(--themed-heading)" }}
                >
                  "Mentally strong hosting providers do not engage in Discord
                  drama."
                </p>
                <footer
                  className="mt-2 text-sm"
                  style={{ color: "var(--themed-text-muted)" }}
                >
                  —{" "}
                  <a
                    href="https://lowendtalk.com/profile/yoursunny"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-sm"
                    style={{ color: "var(--themed-accent)" }}
                  >
                    yoursunny
                  </a>
                  , LowEndTalk
                </footer>
              </blockquote>
              <p>
                The source of all the drama thrived on our Discord server, and
                we will put an end to it. For years, Discord was a venue for
                harassment and misinformation. It has gotten to the point where
                it has done real-life harm to our customers and staff for years.
                For the safety of our customers, we have come to the decision
                that we will no longer have an official Discord server.
              </p>

              <p>
                Your first impression of a hosting provider should not be based
                on their Discord server at all. As much as you heard the common
                saying that you shouldn't judge a book by its cover, you
                also shouldn't judge a hosting provider by their Discord server. It's
                bad enough that other hosts can easily delete any messages
                criticizing them, but Foxomy leaves it all up, so who do you
                think is being more honest and trustworthy?
              </p>
              <Gallery>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/bunphilosophy.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/bunphilosophy.png"
                  width="931"
                  height="109"
                  alt="Bun's philosophy"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/bunphilosophy.png"
                        alt="Bun's philosophy"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Keeping Foxomy Furry Smart
              </h2>
              <p>
                It's the quality of the service that matters, not the
                appearance. In a way, our Discord server works as a litmus test
                to weed out uneducated people. If you're one of those people who
                still judge a hosting provider by their Discord server, then we
                don't want you as a customer. We want intelligent customers who
                can understand that the quality of a service surpasses that of
                its appearance. Everyone else is free to go chase the flashiest
                server hosting provider they can find.
              </p>

              <p>
                You can still privately message staff on Discord for support,
                but we just won't have a public Discord server anymore. We want
                to focus more on our business and not be distracted by Discord
                drama. We've already proven that we can take on the most
                ambitious projects like refactoring the Pterodactyl Panel and
                building a proprietary backup system. We hope you'll understand
                why this is the more professional direction for the future of
                Foxomy.
              </p>

              <p>
                This post will only address publicly available information,
                accusations, messages, and posts. We've intentionally left out
                anything private, like DMs and tickets, which can't be verified
                by the public. If this becomes a legal matter we want to pursue
                in the future, we want the evidence to be handled in the correct
                setting. For the public, we also want evidence that anyone can
                verify for themselves on Discord, Answeroverflow, Reddit, etc.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                The Perpetrators
              </h2>
              <Gallery>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/oppsgraveyard.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/oppsgraveyard.png"
                  width="1024"
                  height="576"
                  alt="OP's graveyard"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/oppsgraveyard.png"
                        alt="OP's graveyard"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <p>
                This feels like the right time to freely talk about this without
                any repercussions, now that we've outlasted all of these
                perpetrators behind the hosting companies that have been
                targeting us. Fortunately for us and unfortunately for them,
                they've either shut down or gotten sold. After SpringRacks got
                sold, we've observed that the targeted harassment in our Discord
                server has died down significantly. They can't hurt us anymore
                because with their hosting companies gone, they have nothing
                left to gain by going after us. Our long-standing presence in
                the industry also proves how successful we have been despite all
                attempts made to destroy us.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                First Encounter With SpringRacks (now ForestRacks)
              </h2>

              <p>
                The one we'll start with is Brandon from SpringRacks Hosting.
                Our first encounter with Brandon was on a subreddit we owned
                called r/minecrafthosting (now defunct). This was a subreddit
                dedicated specifically to Minecraft hosting providers, where
                they can freely advertise themselves. Even though we own the
                subreddit, we try not to be biased by not deleting any posts.
              </p>

              <p>
                We posted our own advertisements first, and Brandon
                (u/brandon1121q) came along several months later. However, one
                day, instead of making a separate post about SpringRacks,
                Brandon commented directly under our post. Like almost all of
                his spammy comments, his comment started with the same old usual
                "Brandon from SpringRacks here!" phrase with SpringRacks
                hyperlinked. The comment was pure advertisement for SpringRacks
                and engaged with nothing in our post.
              </p>

              {/* Image gallery placeholder — swap in the Reddit comment screenshot */}

              <p>
                This was not only bad sportsmanship, but it also came across as
                disrespectful because he was hijacking our post instead of
                creating his own. We deleted his comment and all his posts, so
                that's when his vendetta against us began. It was usual for
                Brandon to criticize other hosts, but Foxomy was the most
                enticing to him. He has constantly bashed Foxomy, saying that we
                were a business to avoid and full of "red flags." He also
                dragged Lunes Hosting into this when we barely had any
                relationship with them besides a specification comparison chart.
              </p>

              {/* Image gallery placeholder — swap in the "business to avoid / red flags" posts */}
              <Gallery>
                <div className="flex flex-col md:flex-row gap-4 my-4">
                  <Item
                    original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonredflag.png"
                    thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonredflag.png"
                    width="2134"
                    height="659"
                    alt="Brandon's comment under our post on r/minecrafthosting"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer rounded-sm overflow-hidden transition-colors flex-[1.75]"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonredflag.png"
                          alt="Brandon's comment under our post on r/minecrafthosting"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Item>
                  <Item
                    original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonredflag2.png"
                    thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonredflag2.png"
                    width="1713"
                    height="1388"
                    alt="Brandon's comment under our post on r/minecrafthosting"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer rounded-sm overflow-hidden transition-colors flex-[0.75]"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonredflag2.png"
                          alt="Brandon's comment under our post on r/minecrafthosting"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Item>
                </div>
              </Gallery>

              <p>
                Starting in May 2024, Brandon from SpringRacks joined our
                Discord server and spent months harassing and blackmailing us
                and our customers. He demanded that we censor our own customers
                who were criticizing SpringRacks, threatening to "expose" us to
                a Discord of several thousand people. He has also accused us of
                DDoSing him with fabricated attack logs.
              </p>

              {/* Image gallery placeholder — swap in the fabricated DDoS attack logs */}
              <Gallery>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonddos.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonddos.png"
                  width="862"
                  height="585"
                  alt="Fabricated DDoS attack logs posted by Brandon"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4 w-[700px]"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/brandonddos.png"
                        alt="Fabricated DDoS attack logs posted by Brandon"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/theipban.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/theipban.png"
                  width="1063"
                  height="150"
                  alt="The IP ban"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/theipban.png"
                        alt="The IP ban"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/notrec.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/notrec.png"
                  width="1069"
                  height="197"
                  alt="Brandon's Reddit review"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/notrec.png"
                        alt="Brandon's Reddit review"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                The Harassment Group
              </h2>

              <p>
                We believe that the original harassment group stemmed from the
                verified hosting providers group from r/MinecraftServer because
                the people who initially attacked us were all from verified
                hosting providers.
              </p>

              <p>
                Before the attacks, we attempted to get Foxomy verified by
                r/MinecraftServer but were denied by Elijahzeal due to our
                Discord server looking bad. We tried to counter them by saying
                that a hosting provider shouldn't be evaluated solely based on
                their Discord server's appearance, but it's impossible to appeal
                to chronically online moderators who are fixated on Discord.
                Since then, smaller and younger hosts who got verified got a
                taste of validation and started targeting us.
              </p>

              {/* Image gallery placeholder — swap in the verification denial screenshot */}

              <p>
                The harassers from the verified hosting providers involves
                Brandon Doan from SpringRacks (2022-2026) and Dean Vo from STEL
                Hosting (2023-2025). Their hosting companies were much younger
                than us and also short lived. What they had all in common was
                that they were also all owned by Vietnamese-Americans as opposed
                to Foxomy being founded by a pure Vietnamese person not born in
                America. Not trying to be racist, but knowing their background
                is important to understand why they may have acted like this
                towards Foxomy.
              </p>
              <p>
                Here's a small history lesson: After the United States lost the
                Vietnam War in 1975, many Vietnamese refugees fled from their
                homeland to avoid political persecution by the communist regime.
                Those Vietnamese Americans were so anti-communist that they
                became hardcore conservatives and Trump supporters. They saw the
                United States as a fighting force against communism, and they
                will always remain loyal to it. The children they raised in
                their households have also inherited their beliefs and became
                bigots themselves.
              </p>

              <p>
                As you may have already heard, Dean from STEL Hosting was the
                one who proposed to denylist (or blacklist) the word "foxomy"
                from r/MinecraftServer. You can thank Dean every time you can't
                mention Foxomy on the subreddit. Brandon further enforced it by
                blackmailing our customers whose servers were hosted on Foxomy,
                threatening that they would be banned from advertising their
                servers on the subreddit.
              </p>

              <Gallery>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/strafe.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/strafe.png"
                  width="724"
                  height="84"
                  alt="Proposal to denylist the word foxomy"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/strafe.png"
                        alt="Proposal to denylist the word foxomy"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Notable Mentions
              </h2>

              <p>
                XandarYT was Dean's most loyal dog and had been very active in
                the STEL Hosting Discord server before they shut down. As of
                April 1st, 2026, he's shifted his camp to the ForestRacks
                (formerly SpringRacks) Discord server. He's been extremely vocal
                about us committing crimes, accusing us of things like DDoSing
                and hacking SpringRacks. He was a head mod of the
                r/MinecraftServer Discord, so he had a strong reputation and
                platform to spread misinformation.
              </p>
              <Gallery>
                <div className="flex flex-col md:flex-row gap-4 my-4">
                  <Item
                    original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/xandarped.jpeg"
                    thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/xandarped.jpeg"
                    width="903"
                    height="1089"
                    alt="XandarYT calling Foxomy a pedophile"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer rounded-sm overflow-hidden transition-colors flex-[0.75]"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/xandarped.jpeg"
                          alt="XandarYT calling Foxomy a pedophile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Item>
                  <Item
                    original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/xandardonot.png"
                    thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/xandardonot.png"
                    width="915"
                    height="455"
                    alt="XandarYT calling Foxomy a pedophile"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer rounded-sm overflow-hidden transition-colors flex-[1.75]"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/xandardonot.png"
                          alt="XandarYT calling Foxomy a pedophile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Item>
                </div>
              </Gallery>

              <p>
                AeonRemnant is an admin from the Admincraft Discord server. He
                has never had any first-hand experience with Foxomy, but he
                couldn't contain his huge ego, so he called us "hot garbage" and
                told OP to move to a "reputable provider." When OP actually
                asked him to explain what made us so bad, he couldn't. Instead,
                he just listed off competitors, admitting that he doesn't even
                use Bedrock and wouldn't know why it's broken.
              </p>

              {/* Image gallery placeholder — swap in the AeonRemnant screenshot */}
              <Gallery>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/aeonhotgarbage.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/aeonhotgarbage.png"
                  width="1137"
                  height="780"
                  alt="AeonRemnant calling Foxomy hot garbage"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/aeonhotgarbage.png"
                        alt="AeonRemnant calling Foxomy hot garbage"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>

              <p>
                Tamz_, also from Admincraft, dogpiled on OP. When former
                customer Syrena pointed out that the trash-talk wasn't nice,
                Tamz_ defended it by rattling off a list of accusations against
                us, that we "fight other hosts, lie about other hosts, claim to
                be the better host, scam our own user base, and more" without
                any credible evidence. He then brushed it off with "not nice is
                the reality of life." We've never done any of the
                aforementioned. We have a perfect track record of never denying
                a refund request even if the transaction is over 180 days old.
              </p>

              {/* Image gallery placeholder — swap in the Tamz_ / Syrena screenshot */}
              <Gallery>
                <Item
                  original="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/tamzscam.png"
                  thumbnail="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/tamzscam.png"
                  width="842"
                  height="251"
                  alt="Tamz_ listing accusations against Foxomy"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-will-no-longer-have-a-discord-server/tamzscam.png"
                        alt="Tamz_ listing accusations against Foxomy"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
            </div>
          </article>

          {/* cd /blog */}
          <div
            className="mt-16 pt-8 border-t transition-colors duration-300"
            style={{ borderColor: "var(--themed-border)" }}
          >
            <Link
              href="/blog"
              className="flex w-full justify-between items-center gap-2 transition-colors group rounded-md p-4 border font-mono"
              style={{
                color: "var(--themed-text)",
                borderColor: "var(--themed-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--themed-nav-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              cd /blog
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <ThemedFooter />
    </div>
  );
}
