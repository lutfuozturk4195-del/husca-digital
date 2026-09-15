"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative "entity graph" motif — a hub node (the brand) connected to
 * satellite nodes (AI answer engines / citation sources), echoing the
 * knowledge-graph concept the whole site is built around.
 *
 * Two bits of motion, both purely additive/decorative:
 * - the whole ring slowly orbits the hub (CSS animation, "husca-orbit")
 * - the ring also drifts a few px toward the cursor (JS, via a ref +
 *   direct style writes so it never triggers React re-renders)
 *
 * Both respect prefers-reduced-motion (global rule in globals.css disables
 * the orbit; the pointer-follow is a small, input-driven transition so it's
 * left as-is). Purely decorative: aria-hidden, pointer-events-none is set
 * by the caller on the wrapping element.
 */
export default function EntityGraphBackground({ className }: { className?: string }) {
  const parallaxRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const section = el.closest("section");
    const target: HTMLElement | Document = section ?? document;

    function handlePointerMove(event: PointerEvent) {
      if (!el) return;
      const rect = section ? section.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate(${px * 10}px, ${py * 7}px)`;
    }

    function handlePointerLeave() {
      if (el) el.style.transform = "translate(0px, 0px)";
    }

    target.addEventListener("pointermove", handlePointerMove as EventListener);
    target.addEventListener("pointerleave", handlePointerLeave as EventListener);
    return () => {
      target.removeEventListener("pointermove", handlePointerMove as EventListener);
      target.removeEventListener("pointerleave", handlePointerLeave as EventListener);
    };
  }, []);

  const satellites = [
    { x: 160, y: 90 },
    { x: 640, y: 90 },
    { x: 90, y: 230 },
    { x: 710, y: 230 },
    { x: 230, y: 360 },
    { x: 570, y: 360 },
  ];
  const hub = { x: 400, y: 225 };
  const outer = [
    { x: 40, y: 150 },
    { x: 760, y: 150 },
    { x: 40, y: 310 },
    { x: 760, y: 310 },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b8ff9" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8b8ff9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b8ff9" />
          <stop offset="100%" stopColor="#5ee6d0" />
        </linearGradient>
      </defs>

      {/* Outer wrapper: nudged toward the cursor, written directly via ref */}
      <g ref={parallaxRef} style={{ transition: "transform 0.6s ease-out" }}>
        {/* Inner wrapper: slow continuous orbit around the hub */}
        <g className="husca-orbit" style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}>
          {/* Faint outer connections suggesting a wider knowledge graph */}
          <g stroke="url(#edgeGradient)" strokeOpacity="0.12" strokeWidth="1">
            {outer.map((o, i) => (
              <line
                key={`outer-${i}`}
                x1={o.x}
                y1={o.y}
                x2={satellites[i % satellites.length].x}
                y2={satellites[i % satellites.length].y}
              />
            ))}
          </g>

          {/* Hub -> satellite edges */}
          <g stroke="url(#edgeGradient)" strokeOpacity="0.3" strokeWidth="1.25">
            {satellites.map((s, i) => (
              <line key={`edge-${i}`} x1={hub.x} y1={hub.y} x2={s.x} y2={s.y} />
            ))}
          </g>

          <circle cx={hub.x} cy={hub.y} r="90" fill="url(#hubGlow)" />

          {outer.map((o, i) => (
            <circle key={`onode-${i}`} cx={o.x} cy={o.y} r="2.5" className="fill-white/20" />
          ))}

          {satellites.map((s, i) => (
            <circle
              key={`snode-${i}`}
              cx={s.x}
              cy={s.y}
              r="4.5"
              className="fill-cyan-300/70"
              style={{
                animation: "husca-node-pulse 3.2s ease-in-out infinite",
                animationDelay: `${i * 0.35}s`,
                transformOrigin: `${s.x}px ${s.y}px`,
              }}
            />
          ))}

          <circle cx={hub.x} cy={hub.y} r="7" className="fill-white" />
          <circle cx={hub.x} cy={hub.y} r="7" fill="none" stroke="#8b8ff9" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}
