export function Slide2() {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

      {/* Content - Match Slide 1 height */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-64">
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
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              View Features
            </button>
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
    </>
  );
}
