import { useState } from "react";
import { FiDollarSign, FiX, FiArrowRight } from "react-icons/fi";

export default function SellShareModal({ share, onClose, backendActor }) {
  const [price, setPrice] = useState(share.price.toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSell = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await backendActor.listShareForSale(
        share.id,
        BigInt(price),
      );
      if ("ok" in result) {
        onClose(true);
      } else {
        setError(`Failed to list share: ${Object.keys(result.err)[0]}`);
      }
    } catch (err) {
      setError("Failed to list share for sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-[#2A2A3A] bg-[#020202] p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">List Share for Sale</h3>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label className="mb-2 flex items-center text-sm font-medium text-gray-300">
            <FiDollarSign className="mr-2" />
            Price (ICP)
          </label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 pl-10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
              min="0"
              step="0.000001"
              placeholder="0.00"
            />
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              ICP
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={() => onClose(false)}
            className="flex items-center rounded-lg border border-[#2A2A3A] bg-transparent px-4 py-2.5 text-gray-300 hover:bg-[#0A0A0A]"
          >
            Cancel
          </button>
          <button
            onClick={handleSell}
            disabled={loading}
            className={`flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Listing...
              </>
            ) : (
              <>
                List Share
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
