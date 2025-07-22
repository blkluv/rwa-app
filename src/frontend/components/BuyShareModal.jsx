import { useState } from "react";

export default function BuyShareModal({ share, asset, onClose, backendActor }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // 1 = details, 2 = confirmation

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await backendActor.buyShare(BigInt(share.id));
      if ("ok" in result) {
        onClose(true);
      } else {
        setError(`Failed to buy share: ${Object.keys(result.err)[0]}`);
        setStep(1);
      }
    } catch (err) {
      setError("Failed to complete purchase");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        {step === 1 ? (
          <>
            <h3 className="mb-4 text-lg font-bold">Purchase Share</h3>
            <div className="mb-4 space-y-2">
              <p className="font-medium">Asset: {asset.title}</p>
              <p>Percentage: {Number(share.percentage).toFixed(2)}%</p>
              <p>Price: {Number(share.price).toLocaleString()} ICP</p>
              <p>
                Current Owner: {share.owner.toString().substring(0, 8)}...
                {share.owner.toString().slice(-4)}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onClose(false)}
                className="rounded border px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="mb-4 text-lg font-bold">Confirm Purchase</h3>
            <div className="mb-4 rounded bg-blue-50 p-3 text-blue-800">
              <p className="font-medium">Transaction Summary:</p>
              <p>
                You are about to purchase {Number(share.percentage).toFixed(2)}%
                of {asset.title}
              </p>
              <p className="mt-2 font-bold">
                Total: {Number(share.price).toLocaleString()} ICP
              </p>
            </div>
            <div className="mb-4 rounded bg-yellow-50 p-3 text-yellow-800">
              <p className="font-medium">Important:</p>
              <p>
                This transaction will be recorded on the blockchain and cannot
                be undone.
              </p>
            </div>
            {error && (
              <div className="mb-4 rounded bg-red-100 p-2 text-red-700">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setStep(1)}
                className="rounded border px-4 py-2 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleBuy}
                disabled={loading}
                className={`rounded px-4 py-2 text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {loading ? "Processing..." : "Confirm Purchase"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
