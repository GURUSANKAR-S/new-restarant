import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="h-screen text-white relative overflow-hidden animate-background-pan">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        <div className="animate-float">
          <h1
            className="text-5xl md:text-8xl font-bold mb-6 drop-shadow-2xl animate-shimmer"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #e2e8f0 60%, #f1f5f9 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            GRAZE & GRAIN
          </h1>
          <p className="text-xl md:text-3xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg animate-fade-in-up stagger-2">
            A modern restaurant experience with exquisite flavors and
            unforgettable moments
          </p>
        </div>
        <Link
          href="/menu"
          className="group relative z-20 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-16 py-6 text-xl font-bold tracking-wide uppercase rounded-3xl shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all duration-300 font-display bg-clip-padding backdrop-blur-xl border-2 border-orange-400/50 hover:border-orange-500/70"
        >
          Explore Our Menu
        </Link>
        <div className="mt-16 animate-spin-slow opacity-40 hover:opacity-70 transition-opacity hover:rotate-[180deg] hover:scale-110">
          <svg
            className="w-20 h-20 drop-shadow-xl"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v10m0 0l-8-4m8 4l-8 4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
