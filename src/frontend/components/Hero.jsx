import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2], { clamp: true });
  const rotateY = useTransform(x, [-100, 100], [-2, 2], { clamp: true });
  const scale = useTransform(y, [-100, 100], [1, 1.03], { clamp: true });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center overflow-hidden bg-black px-4 py-19 md:flex-row"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="z-10 flex-1 space-y-6 py-12 pr-0 md:py-24 md:pr-8">
        <motion.h1
          className="text-3xl leading-tight font-bold text-white md:text-6xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tokenize Real World Assets on{" "}
          <span className="text-indigo-400">ICP</span>
        </motion.h1>

        <motion.p
          className="max-w-xl text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Fractional ownership of real estate, art, and other valuable assets
          powered by the Internet Computer blockchain.
        </motion.p>

        <motion.div
          className="flex space-x-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link to="/marketplace">
            <button className="rounded border border-white/20 px-8 py-5 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black">
              Explore Marketplace
            </button>
          </Link>
          <Link to="/how-it-works">
            <button className="rounded bg-indigo-600 px-8 py-5 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-800">
              Learn More
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="flex space-x-4 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {[
            { value: "100+", label: "Assets Tokenized" },
            { value: "$10M+", label: "Total Value" },
            { value: "5,000+", label: "Investors" },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded border border-gray-900 bg-[#050309] p-2 px-4 py-4 text-left transition hover:bg-[#140f1f]"
            >
              <div className="text-2xl font-bold text-white md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs tracking-wider text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex h-screen flex-1 items-center justify-center md:h-auto md:pl-8"
        style={{ rotateX, rotateY, scale }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div className="relative h-full max-h-[90vh] w-full">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-900">
            {/* <img
              src="/assets/React-icon.webp"
              className="h-full w-full object-cover opacity-100"
              style={{ borderRadius: "12px" }}
              alt="Tokenized assets"
            /> */}
            <video muted loop autoPlay src="/assets/video.mp4"></video>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
