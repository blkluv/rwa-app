import { useState } from "react";
import PrincipalAvatar from "./PrincipalAvatar";
import SellShareModal from "./SellShareModal";
import TransferShareModal from "./TransferShareModal";

export default function ShareCard({
  share,
  asset,
  backendActor,
  principal,
  isOwned,
}) {
  const [isBuying, setIsBuying] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [error, setError] = useState(null);

  const handleBuyShare = async () => {
    setIsBuying(true);
    setError(null);
    try {
      const result = await backendActor.buyShare(share.id);
      if ("ok" in result) {
        window.location.reload();
      } else {
        setError(`Failed: ${Object.keys(result.err)[0]}`);
      }
    } catch (err) {
      setError("Transaction failed");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {showSellModal && (
        <SellShareModal
          share={share}
          onClose={(success) => {
            setShowSellModal(false);
            if (success) window.location.reload();
          }}
          backendActor={backendActor}
        />
      )}
      {showTransferModal && (
        <TransferShareModal
          share={share}
          onClose={(success) => {
            setShowTransferModal(false);
            if (success) window.location.reload();
          }}
          backendActor={backendActor}
        />
      )}

      <div className="mb-2 flex items-start justify-between">
        <div>
          <h4 className="font-semibold">
            {Number(share.percentage).toFixed(2)}% Ownership
          </h4>
          <p className="text-sm text-gray-500">
            {(
              (Number(asset.valuation) * Number(share.percentage)) /
              100
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}{" "}
            value
          </p>
        </div>
        <div className="text-lg font-bold">
          {Number(share.price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <PrincipalAvatar principal={share.owner.toString()} size={6} />
          <span className="ml-2 text-sm text-gray-600">
            {share.owner.toString() === principal ? "You" : "Owner"}
          </span>
        </div>

        {isOwned ? (
          <div className="flex gap-2">
            <button
              onClick={() => setShowSellModal(true)}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Sell
            </button>
            <button
              onClick={() => setShowTransferModal(true)}
              className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
            >
              Transfer
            </button>
          </div>
        ) : (
          <button
            onClick={handleBuyShare}
            disabled={isBuying}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              isBuying
                ? "bg-gray-300 text-gray-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isBuying ? "Processing..." : "Buy Share"}
          </button>
        )}
      </div>

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  );
}
