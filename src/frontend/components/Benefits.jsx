import { motion } from "framer-motion";
import { FaPercent, FaChartLine, FaWallet } from "react-icons/fa";

export default function Benefits() {
  const benefits = [
    {
      icon: <FaPercent className="text-indigo-400" size={20} />,
      title: "Fractional Ownership",
      description: "Own a piece of high-value assets with small investments",
    },
    {
      icon: <FaChartLine className="text-purple-400" size={20} />,
      title: "Liquidity",
      description: "Trade your shares anytime on our secondary market",
    },
    {
      icon: <FaWallet className="text-pink-400" size={20} />,
      title: "Blockchain Security",
      description:
        "All transactions secured by the Internet Computer blockchain",
    },
  ];

  return (
    <section id="benefits" className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-12 flex flex-col justify-start text-left">
        <h2 className="mb-4 text-3xl font-bold text-white">Why Tokenize?</h2>
        <p className="max-w-2xl text-sm text-gray-400">
          Discover the advantages of tokenizing real-world assets on the
          blockchain.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="rounded-xl border border-gray-800 p-8 transition-all duration-300 hover:bg-gray-900/30"
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
              {benefit.icon}
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">
              {benefit.title}
            </h3>
            <p className="text-sm text-gray-400">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
