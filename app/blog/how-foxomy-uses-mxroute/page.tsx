"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Check,
  Bookmark,
  Mail,
  Server,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export default function HowFoxomyUsesMXRoutePost() {
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
            How Foxomy Uses MXRoute to Guarantee Email Delivery
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center text-md transition-colors duration-300"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              December 17, 2025
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Foxomy Team
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              Infrastructure
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
                  original="/imgs/blogs/how-foxomy-uses-mxroute/mailgunmx.jpg"
                  thumbnail="/imgs/blogs/how-foxomy-uses-mxroute/mailgunmx.jpg"
                  width="1200"
                  height="630"
                  alt="Discord webhook showing email delivery notifications"
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
                        src="/imgs/blogs/how-foxomy-uses-mxroute/mailgunmx.jpg"
                        alt="Discord webhook showing email delivery notifications"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <p>
                For the past 5 years since the beginning of Foxomy, we've always
                relied on Mailgun to deliver transactional emails to our
                clients. During those 5 years, we've never had any problems nor
                have opened a ticket with Mailgun.
              </p>

              <p>
                On October 12, 2025, we migrated from Mailgun to MXRoute after
                snagging one of their best Black Friday flash deals for{" "}
                $10/triennially.
              </p>

              <p>
                Mailgun cost us $35/month. Over five years, that would be $35 ×
                12 months × 5 years = $2,100 and that's how much we spent on an
                email provider. If we'd been with MXRoute for those same five
                years, it would be less than $20. That's over 100x cheaper than
                Mailgun.
              </p>
              <p>
                As someone who's accustomed to Mailgun's features like email
                preview logs, detailed logs, and webhooks, MXRoute felt
                extremely barebones. MXRoute uses a stripped down version of the
                webhosting panel, DirectAdmin with some of their custom addon
                features. Some pages on their DirectAdmin were vibe coded AI
                purpose gradient slop that made me feel doubtful at first.
              </p>
              {/* Screenshot of AI slop */}
              <Gallery>
                <Item
                  original="/imgs/blogs/how-foxomy-uses-mxroute/Screenshot 2025-12-17 at 10.21.47 PM.png"
                  thumbnail="/imgs/blogs/how-foxomy-uses-mxroute/Screenshot 2025-12-17 at 10.21.47 PM.png"
                  width="2016"
                  height="1151"
                  alt="Screenshot of AI-generated gradient design in DirectAdmin"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer overflow-hidden transition-colors my-4"
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
                        src="/imgs/blogs/how-foxomy-uses-mxroute/Screenshot 2025-12-17 at 10.21.47 PM.png"
                        alt="Screenshot of AI-generated gradient design in DirectAdmin"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>

              <p>
                I have nothing against this, but it felt underwhelming from
                someone coming from a big provider like Mailgun. Their real
                magic most likely happens behind the scenes in their backend
                where we can't see.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Building Our Email Relay
              </h2>

              <p>
                When we realized how much we missed the features from Mailgun
                like webhooks, we built an email relay server that sits between
                our application and MXRoute. It logs every email sent and sends
                a webhook to Discord.
              </p>

              {/* Screenshot of Discord */}
              <Gallery>
                <Item
                  original="/imgs/blogs/how-foxomy-uses-mxroute/discordwebhook.png"
                  thumbnail="/imgs/blogs/how-foxomy-uses-mxroute/discordwebhook.png"
                  width="689"
                  height="1146"
                  alt="Discord webhook showing email delivery notifications"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden border transition-colors my-4 max-w-sm"
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
                        src="/imgs/blogs/how-foxomy-uses-mxroute/discordwebhook.png"
                        alt="Discord webhook showing email delivery notifications"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>

              <p>
                We also expanded on our relay by giving it redundancy to
                multiple SMTP providers as fallback, including Mailgun, Amazon
                SES, and self-hosted. When we cancelled Mailgun, they still gave
                us 3,000 emails per month for free, which is fine for personal
                use.
              </p>

              {/* SVG Diagram */}
              <div
                className="my-8 p-6 rounded-lg border transition-colors duration-300"
                style={{
                  backgroundColor: "var(--themed-nav-hover)",
                  borderColor: "var(--themed-border)",
                }}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm">
                  <div
                    className="px-4 py-2 rounded border font-mono"
                    style={{
                      borderColor: "var(--themed-border-strong)",
                      backgroundColor: "var(--themed-bg)",
                    }}
                  >
                    Application
                  </div>
                  <span style={{ color: "var(--themed-text-muted)" }}>→</span>
                  <div
                    className="px-4 py-2 rounded border font-mono"
                    style={{
                      borderColor: "var(--themed-accent)",
                      backgroundColor: "var(--themed-bg)",
                    }}
                  >
                    Email Relay
                  </div>
                  <span style={{ color: "var(--themed-text-muted)" }}>→</span>
                  <div className="flex flex-col gap-2">
                    <div
                      className="px-4 py-2 rounded border font-mono text-center"
                      style={{
                        borderColor: "var(--themed-border-strong)",
                        backgroundColor: "var(--themed-bg)",
                      }}
                    >
                      MXRoute (Primary)
                    </div>
                    <div
                      className="px-4 py-2 rounded border font-mono text-center text-xs"
                      style={{
                        borderColor: "var(--themed-border)",
                        backgroundColor: "var(--themed-bg)",
                        color: "var(--themed-text-muted)",
                      }}
                    >
                      Mailgun / SES / Self-hosted (Fallback)
                    </div>
                  </div>
                </div>
              </div>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Delivery Speed
              </h2>

              <p>
                MXRoute is a couple seconds slower than Mailgun in time to
                inbox. Gmail reports a delivery of <strong>4-7 seconds</strong>,
                whereas it used to be <strong>1 second</strong> on Mailgun. We
                also tested NameCrane, and it was the slowest at 21 seconds.
              </p>
              <Gallery>
                <Item
                  original="/imgs/blogs/how-foxomy-uses-mxroute/mxroutegmail.jpg"
                  thumbnail="/imgs/blogs/how-foxomy-uses-mxroute/mxroutegmail.jpg"
                  width="1966"
                  height="283"
                  alt="Screenshot of AI-generated gradient design in DirectAdmin"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer overflow-hidden transition-colors my-4 rounded-sm"
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
                        src="/imgs/blogs/how-foxomy-uses-mxroute/mxroutegmail.jpg"
                        alt="Screenshot of AI-generated gradient design in DirectAdmin"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <p>
                I asked the owner of MXRoute, Jarland Donnell, about this, and
                he said that the delay comes from outbound filtering and relays.
                He could theoretically get it to deliver as fast as Mailgun if
                he didn't care about his IPs' reputation.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                MXRoute's Owner
              </h2>

              <p>
                MXRoute feels less like a corporation and more like a passion
                project. Jarland is extremely active on Discord, genuinely
                passionate about guaranteed delivery rates (especially to
                hotmail), IP reputation, and openly battles spammers. He's also
                not afraid to argue with customers.
              </p>

              <p>
                At Foxomy, we operate on "the customer is always right" while
                MXRoute operates on "I'll kick you out if you're a problem."
                It's his company, and he can run it however he likes. I love the
                energy, and I wish he was there to kick SpringRacks' ass when
                Brandon was lecturing us like Akogeno. Just don't get on
                Jarland's bad side and you'll be fine.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Our First Ticket
              </h2>

              <p>
                I mentioned before that we never had to contact Mailgun's
                support team because it just works. MXRoute broke this record
                because I had to open a ticket with them after we experienced
                longer than usual delays in receiving emails from Discord that
                the verification emails expired. Time to inbox was never a
                problem with Mailgun's catch-all as Mailgun consistently
                received and forwarded emails within a second.
              </p>

              <p>
                For almost a month, some Discord verification emails were taking
                up to 10 minutes to arrive through our catch-all forwarding to
                Gmail:
              </p>

              {/* Code block for delivery times */}
              <div
                className="my-4 p-4 rounded-lg font-mono text-sm overflow-x-auto"
                style={{
                  backgroundColor: "var(--themed-nav-hover)",
                  border: "1px solid var(--themed-border)",
                }}
              >
                <code style={{ color: "var(--themed-text)" }}>
                  <span style={{ color: "var(--themed-text-muted)" }}>
                    Tue, May 13, 2025 at 10:23 AM
                  </span>{" "}
                  <span style={{ color: "#ef4444" }}>
                    (Delivered after 546 seconds)
                  </span>
                  <br />
                  <span style={{ color: "var(--themed-text-muted)" }}>
                    Tue, May 13, 2025 at 10:29 AM
                  </span>{" "}
                  <span style={{ color: "var(--themed-text)" }}>
                    (Delivered after 83 seconds)
                  </span>
                  <br />
                  <span style={{ color: "var(--themed-text-muted)" }}>
                    Tue, May 13, 2025 at 10:31 AM
                  </span>{" "}
                  <span style={{ color: "var(--themed-text)" }}>
                    (Delivered after 5 seconds)
                  </span>
                </code>
              </div>

              <p>
                This did eventually resolve itself, but we stopped using MXRoute
                for receiving email because his spam filters were too strict.
                MXRoute is now purely one of our outbound SMTP providers.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Final Verdict
              </h2>

              <p>
                We would recommend MXRoute as one of our outbound SMTP providers
                for fast email delivery and guaranteed inbox placement.
              </p>
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
