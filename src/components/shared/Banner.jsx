import gsap from "gsap";
import { useEffect, useRef } from "react";
const Banner = () => {
  const bannerText = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bannerText.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
    );
  });

  return (
    <div className="flex justify-center items-center py-6 sm:py-8 md:py-4">
      <div className="relative h-48 sm:h-64 md:h-96 lg:h-[500px] xl:h-[680px] overflow-hidden w-full mx-3 sm:mx-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-3 sm:px-4 md:px-8 flex flex-col items-center justify-center text-center max-w-3xl">
            <div ref={bannerText} className="max-w-2xl">
              <div className="mt-2 sm:mt-4 md:mt-6 inline-block text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full mb-2 sm:mb-3 md:mb-4 font-semibold text-xs sm:text-sm md:text-base">
                🔧 Expert Motorcycle Service
              </div>

              {/* Main Heading */}
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                Keep Your Bike <br className="hidden sm:block" />
                <span className="block mt-1 sm:mt-2">Running Smooth</span>
              </h1>

              {/* Subheading */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 mb-4 md:mb-6 lg:mb-8 mx-auto px-1">
                Professional maintenance, repairs, and servicing for all
                motorcycle brands. Trust our expert technicians to keep your
                ride in perfect condition.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Banner;
