// import { AuthClient } from "@dfinity/auth-client";
// import { useState, useEffect } from "react";
// import { createActor } from "../../../src/declarations/backend";
// import { FaWallet } from "react-icons/fa";

// export default function WalletConnect({
//   onAuthenticated,
//   className = "",
//   buttonText = "Connect Wallet",
// }) {
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [iiCanisterId, setIiCanisterId] = useState(
//     "uzt4z-lp777-77774-qaabq-cai"
//   );

//   useEffect(() => {
//     setIiCanisterId(
//       process.env.CANISTER_ID_INTERNET_IDENTITY ||
//         import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY ||
//         "uzt4z-lp777-77774-qaabq-cai"
//     );
//   }, []);

//   const connect = async (useNFID = false) => {
//     setIsConnecting(true);
//     setShowOptions(false);
//     try {
//       const authClient = await AuthClient.create();

//       const identityProvider = useNFID
//         ? "https://nfid.one/authenticate/?applicationName=MyApp"
//         : process.env.DFX_NETWORK === "ic" ||
//           import.meta.env.DFX_NETWORK === "ic"
//         ? "https://identity.ic0.app/#authorize"
//         : `http://${iiCanisterId}.localhost:4943`;

//       await authClient.login({
//         identityProvider,
//         maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1_000_000_000), // 7 days
//         onSuccess: async () => {
//           const identity = authClient.getIdentity();
//           const principal = identity.getPrincipal().toString();

//           const backendCanisterId =
//             process.env.CANISTER_ID_BACKEND ||
//             import.meta.env.VITE_BACKEND_CANISTER_ID ||
//             "bkyz2-fmaaa-aaaaa-qaaaq-cai";

//           const actor = createActor(backendCanisterId, {
//             agentOptions: { identity },
//           });

//           onAuthenticated({
//             authClient,
//             identity,
//             principal,
//             actor,
//           });
//         },
//         onError: (err) => {
//           console.error("Login failed:", err);
//           alert(`Login failed: ${err.message}`);
//         },
//         windowOpenerFeatures: `width=500,height=600,left=${
//           window.screen.width / 2 - 250
//         },top=${window.screen.height / 2 - 300}`,
//       });
//     } catch (error) {
//       console.error("Authentication error:", error);
//       alert(`Authentication error: ${error.message}`);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   return (
//     <div className="relative inline-block">
//       {/* Main button */}
//       <button
//         onClick={() => setShowOptions(!showOptions)}
//         disabled={isConnecting}
//         className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700 ${className}`}
//       >
//         {isConnecting ? (
//           <>
//             <svg
//               className="h-5 w-5 animate-spin text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//             Connecting...
//           </>
//         ) : (
//           <>
//             <FaWallet className="text-white" />
//             {buttonText}
//           </>
//         )}
//       </button>

//       {/* Options dropdown */}
//       {showOptions && !isConnecting && (
//         <div className="absolute mt-2 w-56 rounded-lg border bg-black border-gray-800 shadow-lg z-50">
//           <button
//             onClick={() => connect(false)}
//             className="block w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-900 rounded-t-lg"
//           >
//             Internet Identity
//           </button>
//           <button
//             onClick={() => connect(true)}
//             className="block w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-900 rounded-b-lg"
//           >
//             NFID
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// import { AuthClient } from "@dfinity/auth-client";
// import { useState, useEffect } from "react";
// import { createActor } from "../../../src/declarations/backend";
// import { FaWallet } from "react-icons/fa";

// export default function WalletConnect({
//   onAuthenticated,
//   className = "",
//   buttonText = "Connect Wallet",
// }) {
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [iiCanisterId, setIiCanisterId] = useState(
//     "uzt4z-lp777-77774-qaabq-cai"
//   );

//   useEffect(() => {
//     setIiCanisterId(
//       process.env.CANISTER_ID_INTERNET_IDENTITY ||
//         import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY ||
//         "uzt4z-lp777-77774-qaabq-cai"
//     );
//   }, []);

//   const connect = async (useNFID = false) => {
//     setIsConnecting(true);
//     setShowOptions(false);
//     try {
//       const authClient = await AuthClient.create();

//       const identityProvider = useNFID
//         ? "https://nfid.one/authenticate/?applicationName=MyApp"
//         : process.env.DFX_NETWORK === "ic" ||
//           import.meta.env.DFX_NETWORK === "ic"
//         ? "https://identity.ic0.app/#authorize"
//         : `http://${iiCanisterId}.localhost:4943`;

//       await authClient.login({
//         identityProvider,
//         maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1_000_000_000), // 7 days
//         onSuccess: async () => {
//           const identity = authClient.getIdentity();
//           const principal = identity.getPrincipal().toString();

//           const backendCanisterId =
//             process.env.CANISTER_ID_BACKEND ||
//             import.meta.env.VITE_BACKEND_CANISTER_ID ||
//             "bkyz2-fmaaa-aaaaa-qaaaq-cai";

//           const actor = createActor(backendCanisterId, {
//             agentOptions: { identity },
//           });

//           onAuthenticated({
//             authClient,
//             identity,
//             principal,
//             actor,
//           });
//         },
//         onError: (err) => {
//           console.error("Login failed:", err);
//           alert(`Login failed: ${err.message}`);
//         },
//         // 🚨 Force full-page redirect instead of popup
//         // windowOpenerFeatures: undefined,
//       });
//     } catch (error) {
//       console.error("Authentication error:", error);
//       alert(`Authentication error: ${error.message}`);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   return (
//     <div className="relative inline-block">
//       {/* Main button */}
//       <button
//         onClick={() => setShowOptions(!showOptions)}
//         disabled={isConnecting}
//         className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700 ${className}`}
//       >
//         {isConnecting ? (
//           <>
//             <svg
//               className="h-5 w-5 animate-spin text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//             Connecting...
//           </>
//         ) : (
//           <>
//             <FaWallet className="text-white" />
//             {buttonText}
//           </>
//         )}
//       </button>

//       {/* Options dropdown */}
//       {showOptions && !isConnecting && (
//         <div className="absolute mt-2 w-56 rounded-lg border bg-black border-gray-800 shadow-lg z-50">
//           <button
//             onClick={() => connect(false)}
//             className="block w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-900 rounded-t-lg"
//           >
//             Internet Identity
//           </button>
//           <button
//             onClick={() => connect(true)}
//             className="block w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-900 rounded-b-lg"
//           >
//             NFID
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

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
  const [showOptions, setShowOptions] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [iiCanisterId, setIiCanisterId] = useState(
    "uzt4z-lp777-77774-qaabq-cai"
  );

  useEffect(() => {
    // Initialize auth client on component mount
    const initAuth = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);

        const authenticated = await client.isAuthenticated();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const identity = client.getIdentity();
          setPrincipal(identity.getPrincipal().toString());

          const backendCanisterId =
            process.env.CANISTER_ID_BACKEND ||
            import.meta.env.VITE_BACKEND_CANISTER_ID ||
            "bkyz2-fmaaa-aaaaa-qaaaq-cai";

          const actor = createActor(backendCanisterId, {
            agentOptions: { identity },
          });

          onAuthenticated({
            authClient: client,
            identity,
            principal: identity.getPrincipal().toString(),
            actor,
          });
        }
      } catch (error) {
        console.error("Failed to initialize auth client:", error);
      }
    };

    initAuth();

    // Set II canister ID
    setIiCanisterId(
      process.env.CANISTER_ID_INTERNET_IDENTITY ||
        import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY ||
        "uzt4z-lp777-77774-qaabq-cai"
    );
  }, [onAuthenticated]);

  const connect = async (useNFID = false) => {
    if (!authClient) {
      console.error("Auth client not initialized");
      return;
    }

    setIsConnecting(true);
    setShowOptions(false);

    try {
      // Determine identity provider based on selection and environment
      let identityProvider;

      if (useNFID) {
        identityProvider =
          "https://nfid.one/authenticate/?applicationName=MyApp";
      } else {
        const network = process.env.DFX_NETWORK || import.meta.env.DFX_NETWORK;
        identityProvider =
          network === "ic"
            ? // ? "https://identity.ic0.app" // Mainnet
              "https://id.ai" // Mainnet
            : `http://${iiCanisterId}.localhost:4943`; // Local
      }

      // For mobile devices, we need to ensure we're not using popups
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      await authClient.login({
        identityProvider,
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1_000_000_000), // 7 days
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

          setIsAuthenticated(true);
          setPrincipal(principal);

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
        // For mobile, disable window opener features to ensure redirect flow
        windowOpenerFeatures: isMobile
          ? undefined
          : `toolbar=0,location=0,menubar=0,width=500,height=600,left=${
              window.screenX + (window.outerWidth - 500) / 2
            },top=${window.screenY + (window.outerHeight - 600) / 2}`,
      });
    } catch (error) {
      console.error("Authentication error:", error);
      alert(`Authentication error: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  async function logout() {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal("");
      onAuthenticated(null);
    }
  }

  return (
    <div className="relative inline-block">
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <p className="text-sm">
            <span className="font-mono">{principal.substring(0, 10)}...</span>
          </p>
          <button
            onClick={logout}
            className="transform rounded-lg bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          {/* Main button */}
          <button
            onClick={() => setShowOptions(!showOptions)}
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

          {/* Options dropdown */}
          {showOptions && !isConnecting && (
            <div className="absolute mt-2 w-56 rounded-lg border bg-black border-gray-800 shadow-lg z-50">
              <button
                onClick={() => connect(false)}
                className="block w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-900 rounded-t-lg"
              >
                Internet Identity
              </button>
              <button
                onClick={() => connect(true)}
                className="block w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-900 rounded-b-lg"
              >
                NFID
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
