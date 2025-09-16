import { AuthClient } from "@dfinity/auth-client";
import { useState, useEffect } from "react";
import { createActor } from "../../../src/declarations/backend";
import { FaWallet } from "react-icons/fa";

export default function WalletConnect({
  onAuthenticated,
  className = "",
  buttonText = "Connect Wallet",
}) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [iiCanisterId, setIiCanisterId] = useState(
    "uzt4z-lp777-77774-qaabq-cai"
  );

  useEffect(() => {
    setIiCanisterId(
      process.env.CANISTER_ID_INTERNET_IDENTITY ||
        import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY ||
        "uzt4z-lp777-77774-qaabq-cai"
    );
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const authClient = await AuthClient.create();
      const identityProvider =
        process.env.DFX_NETWORK === "ic" || import.meta.env.DFX_NETWORK === "ic"
          ? // ? "https://identity.ic0.app"
            "https://id.ai"
          : `http://${iiCanisterId}.localhost:4943`;

      await authClient.login({
        identityProvider,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();
          const backendCanisterId =
            process.env.CANISTER_ID_BACKEND ||
            import.meta.env.VITE_BACKEND_CANISTER_ID ||
            "bkyz2-fmaaa-aaaaa-qaaaq-cai";

          const actor = createActor(backendCanisterId, {
            agentOptions: { identity },
          });

          onAuthenticated({
            authClient,
            identity,
            principal,
            actor,
          });
        },
        onError: (err) => {
          console.error("Login failed:", err);
          alert(`Login failed: ${err.message}`);
        },
        windowOpenerFeatures: `width=500,height=600,left=${
          window.screen.width / 2 - 250
        },top=${window.screen.height / 2 - 300}`,
      });
    } catch (error) {
      console.error("Authentication error:", error);
      alert(`Authentication error: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700 ${className}`}
    >
      {isConnecting ? (
        <>
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
          Connecting...
        </>
      ) : (
        <>
          <FaWallet className="text-white" />
          {buttonText}
        </>
      )}
    </button>
  );
}
