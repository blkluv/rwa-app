import { useEffect, useState } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEye,
  FiMapPin,
  FiDollarSign,
  FiTrendingUp,
  FiLayers,
} from "react-icons/fi";

export default function MarketplaceSection() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const demoAssets = [
      {
        id: 1,
        title: "Luxury Villa",
        description: "Waterfront property with ocean views",
        location: "Bali, Indonesia",
        valuation: 2500000,
        returnEstimate: 12.5,
        sharesAvailable: 45,
        tokenizedPercentage: 75,
        minInvestment: 1,
        images: ["/assets/asset3.jpg"],
      },
      {
        id: 2,
        title: "Downtown Office",
        description: "Prime city office space with high occupancy",
        location: "New York, USA",
        valuation: 5000000,
        returnEstimate: 8.2,
        sharesAvailable: 120,
        tokenizedPercentage: 60,
        minInvestment: 5,
        images: ["/assets/asset2.jpg"],
      },
      {
        id: 3,
        title: "Organic Farmland",
        description: "Sustainable agriculture investment",
        location: "Tuscany, Italy",
        valuation: 1800000,
        returnEstimate: 15.3,
        sharesAvailable: 90,
        tokenizedPercentage: 45,
        minInvestment: 2,
        images: ["/assets/asset1.jpg"],
      },
    ];
    setAssets(demoAssets);
    setLoading(false);
  }, []);

  const filteredAssets = assets.filter(
    (asset) =>
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section id="marketplace" className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-12 flex flex-col justify-start text-left">
        <h2 className="mb-4 text-3xl font-bold text-white">Marketplace</h2>
        <p className="max-w-2xl text-sm text-gray-400">
          Browse and invest in tokenized real-world assets from around the
          globe.
        </p>
      </div>

      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] py-3 pr-4 pl-10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex w-full gap-4 md:w-auto">
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

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-400">Loading assets...</p>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="rounded-xl border border-[#2A2A3A] bg-[#020202] py-16 text-center">
          <p className="text-gray-400">No assets found matching your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => navigate(`/asset/${asset.id}`)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-[#2A2A3A] bg-[#020202] transition-all duration-300 hover:border-indigo-500/50"
            >
              <div className="relative h-78 overflow-hidden">
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
                  <h3 className="text-xl font-bold text-white">
                    {asset.title}
                  </h3>
                  {asset.location && (
                    <div className="mt-1 flex items-center">
                      <FiMapPin className="mr-1 text-indigo-300" size={14} />
                      <span className="text-sm text-gray-300">
                        {asset.location}
                      </span>
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
          ))}
        </div>
      )}
    </section>
  );
}
