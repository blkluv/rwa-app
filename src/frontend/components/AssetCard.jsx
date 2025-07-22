import { FiDollarSign, FiTrendingUp, FiLayers, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AssetCard({
  asset,
  backendActor,
  principal,
  showBuyButton,
}) {
  return (
    <Link to={`/asset/${asset.id}`}>
      <div className="group overflow-hidden rounded-xl border border-[#2A2A3A] bg-[#020202] transition-all duration-300 hover:border-indigo-500/50">
        <div className="relative h-48 overflow-hidden">
          {asset.images?.length > 0 ? (
            <img
              src={asset.images[0]}
              alt={asset.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#1A1A2A]">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <h3 className="text-xl font-bold text-white">{asset.title}</h3>
            {asset.location && (
              <div className="mt-1 flex items-center">
                <FiMapPin className="mr-1 text-indigo-300" size={14} />
                <span className="text-sm text-gray-300">{asset.location}</span>
              </div>
            )}
          </div>
          <div className="absolute top-3 right-3 flex items-center rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
            <FiTrendingUp className="mr-1 text-green-400" size={14} />
            <span className="text-sm font-medium text-white">
              {asset.returnEstimate || "N/A"}% ROI
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <FiDollarSign className="mr-2 text-indigo-300" size={16} />
              <span className="text-sm">
                ${asset.valuation?.toLocaleString() || "N/A"}
              </span>
            </div>
            <div className="rounded-full bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-300">
              {asset.sharesAvailable} shares left
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <FiLayers className="mr-2 text-indigo-300" size={16} />
              <span className="text-sm">
                {asset.tokenizedPercentage || 0}% tokenized
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Min. {asset.minInvestment || 1} share
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
