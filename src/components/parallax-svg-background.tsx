import { useEffect, useRef } from "react";

export function ParallaxSvgBackground() {
  const slowLayer = useRef<SVGGElement>(null);
  const fastLayer = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const scrollRef = { y: 0, lastY: -1 };
    let rafId = 0;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const y = scrollRef.y;
      if (y === scrollRef.lastY) return;
      scrollRef.lastY = y;

      const slow = slowLayer.current;
      const fast = fastLayer.current;
      if (slow) slow.style.transform = `translate3d(0,${y * -0.08}px,0)`;
      if (fast) fast.style.transform = `translate3d(0,${y * -0.16}px,0)`;
    };

    const onScroll = () => {
      scrollRef.y = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(apply);
      }
    };

    // initial positioning
    scrollRef.y = window.scrollY;
    scrollRef.lastY = scrollRef.y;
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
        ticking = false;
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg
        className="h-[125%] w-full text-accent opacity-[0.14]"
        viewBox="0 0 1440 1100"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g ref={slowLayer} className="will-change-transform">
          <path
            d="M-90 210C168 48 360 390 616 214C858 48 1010 72 1530 310"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M-120 820C210 620 442 1010 746 794C1000 614 1210 680 1535 900"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="14 18"
            strokeLinecap="round"
          />
          <circle cx="1245" cy="230" r="135" stroke="currentColor" strokeWidth="2" />
          <circle cx="1245" cy="230" r="92" stroke="currentColor" strokeWidth="2" strokeDasharray="8 14" />
        </g>

        <g ref={fastLayer} className="will-change-transform">
          <path
            d="M82 560C220 390 398 422 472 590C548 760 730 740 836 574C950 396 1156 392 1380 540"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M150 1000L242 908L334 1000L242 1092Z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="104" cy="340" r="22" fill="currentColor" />
          <circle cx="1090" cy="720" r="12" fill="currentColor" />
          <circle cx="1350" cy="610" r="7" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}