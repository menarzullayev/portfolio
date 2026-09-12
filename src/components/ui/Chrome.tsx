'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Sahifa tepasidagi o'qish jarayoni ko'rsatkichi */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
    />
  );
}

/** Sahifa orqa fonidagi yorug'lik va to'r */
export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div
        className="glow animate-float-slow"
        style={{ width: 520, height: 520, top: '-10%', left: '-8%', background: 'var(--glow-1)' }}
      />
      <div
        className="glow animate-float-slow"
        style={{
          width: 460,
          height: 460,
          top: '38%',
          right: '-10%',
          background: 'var(--glow-2)',
          animationDelay: '2.4s',
        }}
      />
      <div
        className="glow"
        style={{ width: 620, height: 620, bottom: '-18%', left: '28%', background: 'var(--glow-1)', opacity: 0.6 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, var(--bg) 78%)',
        }}
      />
    </div>
  );
}
