'use client';

import { motion } from 'framer-motion';

export function LuxuryAnimation() {
  return (
    <div className="absolute inset-0 z-0">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[40vw] h-[40vw] rounded-full border border-white/10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.5, 2],
            opacity: [0.5, 0],
            x: ['-50%', '-50%'],
            y: ['-50%', '-50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}
    </div>
  );
}