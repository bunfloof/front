export function Slide3() {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-gray-900" />

      {/* Content - Match Slide 1 height */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-64">
        <div className="text-center text-white max-w-5xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Deploy in
            <br />
            <span className="text-purple-400">Seconds</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            One-click deployment for over 100+ games
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.97 16l-2.25 2.25a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 010-1.06L4.66 12.7a.75.75 0 011.06 0L7.97 15a.75.75 0 010 1.06zm8.06 0a.75.75 0 010-1.06L18.28 12.7a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06 0L16.03 15zM12 2.25a.75.75 0 01.75.75v6l1.97-1.97a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L8.22 7.84a.75.75 0 111.06-1.06L11.25 9V3a.75.75 0 01.75-.75z" />
              </svg>
              Explore Games
            </button>
            <button className="bg-transparent border border-purple-500 hover:border-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2">
              Free Trial Available
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
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
