import { motion } from "framer-motion";
import { FiEdit3, FiDollarSign, FiCpu } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
          <FiEdit3 className="text-indigo-400" size={32} />
        </div>
      ),
      title: "List Your Asset",
      description:
        "Tokenize your real-world asset by creating fractional shares.",
    },
    {
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
          <FiDollarSign className="text-green-400" size={32} />
        </div>
      ),
      title: "Trade & Invest in Shares",
      description: "Buy & sell shares on our secondary marketplace anytime.",
    },
    {
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
          <FiCpu className="text-purple-400" size={32} />
        </div>
      ),
      title: "AI Invest Agent",
      description:
        "Let our AI suggest the best assets and optimal times to trade. With permission, it can even execute trades for you.",
    },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-12 flex flex-col justify-start text-left">
        <h2 className="mb-4 text-3xl font-bold text-white">How It Works</h2>
        <p className="max-w-2xl text-sm text-gray-400">
          Our simple process makes tokenizing, investing, and growing your
          real-world assets effortless and smart.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="rounded-xl border border-gray-800 p-8 transition-all duration-300 hover:border-indigo-400 hover:bg-gray-900/30"
            whileHover={{ y: -5 }}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="mb-3 text-xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="text-sm text-gray-400">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
