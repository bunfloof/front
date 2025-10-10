import { Button } from "../ui/button";

export function Slide2() {
  return (
    <div className="h-[500px] md:h-[600px] lg:h-[700px] relative overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -top-20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        <div className="text-center text-white max-w-5xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Scale with
            <br />
            <span className="text-green-500">Confidence</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Built for performance and reliability
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="flex gap-4 flex-wrap">
              <Button variant="minecraft" size="lg" className="text-md">
                Get Started
              </Button>
            </div>
            <button className="bg-transparent border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2">
              99.9% Uptime Guaranteed
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
