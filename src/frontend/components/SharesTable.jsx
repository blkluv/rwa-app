import { useState } from "react";
import { Principal } from "@dfinity/principal";
import {
  FiDollarSign,
  FiPercent,
  FiUser,
  FiShoppingCart,
  FiSend,
} from "react-icons/fi";
import SellShareModal from "./SellShareModal";
import TransferShareModal from "./TransferShareModal";
import BuyShareModal from "./BuyShareModal";

export default function SharesTable({
  shares = [],
  assets = [],
  backendActor,
  principal,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedShare, setSelectedShare] = useState(null);
  const [error, setError] = useState(null);

  const handleAction = (share, action) => {
    setSelectedShare(share);
    setActiveModal(action);
    setError(null);
  };

  const getAssetDetails = (assetId) => {
    return (
      assets.find((a) => {
        if (typeof a.id === "bigint" || typeof assetId === "bigint") {
          return a.id.toString() === assetId.toString();
        }
        return a.id === assetId;
      }) || {
        id: assetId,
        title: "Unknown Asset",
        valuation: 0,
        images: [],
      }
    );
  };

  const formatICP = (price) => {
    try {
      const priceNum =
        typeof price === "bigint"
          ? Number(price) / 100000000
          : Number(price) / 100000000;
      return isNaN(priceNum)
        ? "0.00"
        : priceNum.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          });
    } catch {
      return "0.00";
    }
  };

  const isShareListed = (price) => {
    try {
      if (price === undefined || price === null) return false;
      if (typeof price === "bigint") return price > 0n;
      return Number(price) > 0;
    } catch {
      return false;
    }
  };

  const calculateShareValue = (valuation, percentage) => {
    try {
      const val =
        typeof valuation === "bigint" ? Number(valuation) : Number(valuation);
      const pct =
        typeof percentage === "bigint"
          ? Number(percentage)
          : Number(percentage);
      return (val * pct) / 100;
    } catch {
      return 0;
    }
  };

  const closeModal = (success = false) => {
    setActiveModal(null);
    if (success) window.location.reload();
  };

  const isOwnedByUser = (ownerPrincipal) => {
    try {
      if (!principal || !ownerPrincipal) return false;
      return ownerPrincipal.toString() === principal;
    } catch {
      return false;
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#2A2A3A] bg-[#020202] shadow-lg">
      {/* Modals */}
      {activeModal === "sell" && selectedShare && (
        <SellShareModal
          share={selectedShare}
          asset={getAssetDetails(selectedShare.assetId)}
          onClose={closeModal}
          backendActor={backendActor}
        />
      )}

      {activeModal === "transfer" && selectedShare && (
        <TransferShareModal
          share={selectedShare}
          asset={getAssetDetails(selectedShare.assetId)}
          onClose={closeModal}
          backendActor={backendActor}
        />
      )}

      {activeModal === "buy" && selectedShare && (
        <BuyShareModal
          share={selectedShare}
          asset={getAssetDetails(selectedShare.assetId)}
          onClose={closeModal}
          backendActor={backendActor}
        />
      )}

      {/* Main Table */}
      <table className="min-w-full divide-y divide-[#2A2A3A]">
        <thead className="bg-[#0A0A0A]">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Asset
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Ownership
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Value
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2A2A3A]">
          {shares.length > 0 ? (
            shares.map((share) => {
              const asset = getAssetDetails(share.assetId);
              const isOwned = isOwnedByUser(share.owner);
              const listed = isShareListed(share.price);
              const shareValue = calculateShareValue(
                asset.valuation,
                share.percentage,
              );

              return (
                <tr
                  key={`${share.id?.toString()}_${share.owner?.toString()}`}
                  className="transition-colors hover:bg-[#0A0A0A]/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {asset.images?.[0] ? (
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={asset.images[0]}
                            alt={asset.title}
                            onError={(e) => {
                              e.target.src = "/placeholder-asset.png";
                              e.target.onerror = null;
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#1A1A2A]">
                          <span className="text-xs text-gray-500">
                            No Image
                          </span>
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="max-w-[200px] truncate text-sm font-medium text-white">
                          {asset.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {share.assetId?.toString().substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiPercent className="mr-2 text-indigo-300" size={14} />
                      <span className="text-sm text-gray-300">
                        {typeof share.percentage === "number"
                          ? share.percentage.toFixed(2)
                          : "0.00"}
                        %
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiDollarSign className="mr-2 text-green-300" size={14} />
                      <span className="text-sm text-gray-300">
                        $
                        {isNaN(shareValue)
                          ? "0.00"
                          : shareValue.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiShoppingCart
                        className="mr-2 text-amber-300"
                        size={14}
                      />
                      <span className="text-sm text-gray-300">
                        {listed
                          ? `${formatICP(share.price)} ICP`
                          : "Not listed"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        isOwned
                          ? "bg-green-500/10 text-green-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      <FiUser className="mr-1" size={12} />
                      {isOwned ? "Owned" : "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {isOwned ? (
                        <>
                          <button
                            onClick={() => handleAction(share, "sell")}
                            className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium ${
                              listed
                                ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                : "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                            }`}
                          >
                            <FiShoppingCart className="mr-1" size={14} />
                            {listed ? "Update" : "Sell"}
                          </button>
                          <button
                            onClick={() => handleAction(share, "transfer")}
                            className="inline-flex items-center rounded-md bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-400 hover:bg-green-500/20"
                          >
                            <FiSend className="mr-1" size={14} />
                            Transfer
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleAction(share, "buy")}
                          className="inline-flex items-center rounded-md bg-indigo-500/10 px-3 py-1.5 text-sm font-medium text-indigo-400 hover:bg-indigo-500/20"
                        >
                          <FiShoppingCart className="mr-1" size={14} />
                          Buy
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-12 text-center">
                <div className="text-sm text-gray-400">No shares available</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {error && (
        <div className="mx-6 mt-4 rounded-md bg-red-500/10 p-3 text-sm text-red-400">
          <div className="font-medium">Error:</div>
          <div>{error}</div>
        </div>
      )}
    </div>
  );
}
