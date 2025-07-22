import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

export default function PortfolioSummary({ shares }) {
  // Convert BigInt to Number before calculations
  const totalValue = shares.reduce(
    (sum, share) =>
      sum + (Number(share.price) / Number(share.percentage)) * 100,
    0,
  );

  const totalShares = shares.length;

  return (
    <motion.div
      className="mb-8 rounded-xl border border-gray-800 p-6 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-start justify-between md:flex-row">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Portfolio Summary
        </h2>
        <div className="flex w-full gap-4 pb-8 md:w-auto">
          <Link
            to="/create-asset"
            className="flex w-1/2 items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700 md:w-auto md:px-6"
          >
            <FiPlus className="mr-2" />
            List Asset
          </Link>
          <button
            onClick={() => navigate("/marketplace")}
            className="flex w-1/2 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-600/10 px-4 py-3 font-medium text-indigo-400 transition-colors duration-200 hover:bg-indigo-600/20 md:w-auto md:px-6"
          >
            <FiEye className="mr-2" />
            View All
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          className="rounded-xl border border-gray-800 p-6 transition-all duration-300 hover:bg-gray-900/30"
          whileHover={{ y: -5 }}
        >
          <h3 className="text-sm font-medium text-blue-400">Total Value</h3>
          <p className="text-2xl font-bold text-white">
            ${totalValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </p>
        </motion.div>

        <motion.div
          className="rounded-xl border border-gray-800 p-6 transition-all duration-300 hover:bg-gray-900/30"
          whileHover={{ y: -5 }}
        >
          <h3 className="text-sm font-medium text-green-400">Total Shares</h3>
          <p className="text-2xl font-bold text-white">{totalShares}</p>
        </motion.div>

        <motion.div
          className="rounded-xl border border-gray-800 p-6 transition-all duration-300 hover:bg-gray-900/30"
          whileHover={{ y: -5 }}
        >
          <h3 className="text-sm font-medium text-purple-400">Assets</h3>
          <p className="text-2xl font-bold text-white">
            {new Set(shares.map((s) => s.assetId.toString())).size}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
