import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Youtube } from "lucide-react";

export function SlideTutorialVideos() {
  return (
    <div className="h-[500px] md:h-[600px] lg:h-[700px] flex flex-col relative overflow-hidden pt-20">
      {/* Background */}
      <Image
        src="/imgs/blogs/new-tutorial-videos/newyoutubetutorials.jpg"
        alt="New YouTube tutorial videos"
        fill
        className="object-cover"
        priority
      />

      {/* Dark gradient overlay - leans toward red/black to evoke YouTube branding */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-red-950/40" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 py-8">
          <div className="text-white max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
              New Tutorial Videos
              <br />
              from the Team
            </h1>
            <p className="text-gray-300 mb-8 text-xl leading-relaxed max-w-3xl">
              We've started uploading tutorial videos on our YouTube channel to
              help our community create their very best servers.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button variant="classic" size="lg" className="text-md">
                <Link href="/blog/new-tutorial-videos">Read Post</Link>
              </Button>
              <Button
                variant="classic"
                size="lg"
                className="text-md bg-red-600 hover:bg-red-500 border-red-700"
              >
                <Link
                  href="https://www.youtube.com/@foxomy/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Watch on YouTube
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
