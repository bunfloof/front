import Image from "next/image";
import { Button } from "./ui/button";

export function SupportSection() {
  return (
    <section className="relative py-2 md:py-16 bg-[#F6F0E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-2 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/PALLEDICOCCODRILLoNEfoxomy.png"
              alt="Foxomy Support"
              width={600}
              height={600}
              className="object-contain w-full h-auto max-w-2xl"
              priority
            />
          </div>

          {/* Right side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-black leading-tight">
              World-Class Support and Hospitality
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-base md:text-lg leading-relaxed">
                Our support is available 24×7 with fast response times, and
                we’re here to help, not lecture. Our support team is trained to
                the highest standards to help you with your needs.
                {/* needs with patience and understanding, including those with
                ADHD, autism, and other neurodivergent conditions. */}
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                We believe extraordinary hospitality means treating each guest
                as the most important person in the world. For any request,
                contact our team and let us show you what world-class service
                truly means.
              </p>
            </div>
            <Button variant="classic" size="xl" className="text-xl">
              {" "}
              <a href="https://foxomy.com/billing/submitticket.php?step=2&deptid=2" target="_blank" rel="noopener noreferrer">
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
