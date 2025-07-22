import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: "📝",
      title: "List Your Asset",
      description:
        "Tokenize your real-world asset by creating fractional shares.",
    },
    {
      icon: "💸",
      title: "Invest in Shares",
      description: "Buy shares of assets you believe in with as little as $10.",
    },
    {
      icon: "📈",
      title: "Trade & Grow",
      description: "Sell your shares on our secondary marketplace anytime.",
    },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-12 flex flex-col justify-start text-left">
        <h2 className="mb-4 text-3xl font-bold text-white">How It Works</h2>
        <p className="max-w-2xl text-sm text-gray-400">
          Our simple three-step process makes tokenizing and investing in
          real-world assets accessible to everyone.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="rounded-xl border border-gray-800 p-8 transition-all duration-300 hover:border-indigo-400 hover:bg-gray-900/30"
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 text-4xl">{step.icon}</div>
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
