import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { FiUser, FiArrowRight, FiX, FiAlertTriangle } from "react-icons/fi";

export default function TransferShareModal({
  share,
  asset,
  onClose,
  backendActor,
}) {
  const [principalInput, setPrincipalInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // 1 = input, 2 = confirmation

  const handleTransfer = async () => {
    setLoading(true);
    setError(null);

    try {
      const principal = Principal.fromText(principalInput);
      const result = await backendActor.transferShare(
        BigInt(share.id),
        principal,
      );

      if ("ok" in result) {
        onClose(true);
      } else {
        const errorType = Object.keys(result.err)[0];
        setError(
          errorType === "InvalidRecipient"
            ? "Cannot transfer to yourself"
            : errorType === "Unauthorized"
              ? "You don't own this share"
              : "Transfer failed",
        );
        setStep(1);
      }
    } catch (err) {
      setError(
        err.message.includes("Invalid principal")
          ? "Invalid principal ID format"
          : "Transfer failed",
      );
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-[#2A2A3A] bg-[#020202] p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {step === 1 ? "Transfer Share" : "Confirm Transfer"}
          </h3>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {step === 1 ? (
          <>
            <div className="mb-6">
              <label className="mb-2 flex items-center text-sm font-medium text-gray-300">
                <FiUser className="mr-2" />
                Recipient Principal ID
              </label>
              <input
                type="text"
                value={principalInput}
                onChange={(e) => setPrincipalInput(e.target.value)}
                className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
                placeholder="Enter principal ID (e.g., wlkyq-...)"
              />
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
                onClick={() => setStep(2)}
                disabled={!principalInput}
                className={`flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700 ${
                  !principalInput ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Continue
                <FiArrowRight className="ml-2" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-4">
                <p className="text-sm font-medium text-gray-400">Asset</p>
                <p className="text-white">{asset.title}</p>
              </div>
              <div className="rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-4">
                <p className="text-sm font-medium text-gray-400">
                  Share Percentage
                </p>
                <p className="text-white">
                  {Number(share.percentage).toFixed(2)}%
                </p>
              </div>
              <div className="rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-4">
                <p className="text-sm font-medium text-gray-400">Recipient</p>
                <p className="text-white">
                  {principalInput.substring(0, 10)}...{principalInput.slice(-4)}
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <div className="flex items-start">
                <FiAlertTriangle className="mt-0.5 mr-2 flex-shrink-0 text-amber-400" />
                <div>
                  <p className="font-medium text-amber-400">Warning</p>
                  <p className="text-sm text-amber-300">
                    This action cannot be undone. The share will be permanently
                    transferred.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center rounded-lg border border-[#2A2A3A] bg-transparent px-4 py-2.5 text-gray-300 hover:bg-[#0A0A0A]"
              >
                Back
              </button>
              <button
                onClick={handleTransfer}
                disabled={loading}
                className={`flex items-center rounded-lg bg-green-600 px-4 py-2.5 text-white hover:bg-green-700 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                    >
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
                    Transferring...
                  </>
                ) : (
                  "Confirm Transfer"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
