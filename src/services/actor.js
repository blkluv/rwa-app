import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../declarations/backend";

let backendActor;
let currentCanisterId = null;

export async function getBackendActor() {
  const backendCanisterId =
    process.env.CANISTER_ID_BACKEND ||
    import.meta.env.VITE_BACKEND_CANISTER_ID ||
    "bkyz2-fmaaa-aaaaa-qaaaq-cai";

  // Reset actor if canister ID changed
  if (currentCanisterId !== backendCanisterId) {
    backendActor = null;
    currentCanisterId = backendCanisterId;
  }

  if (!backendActor) {
    const authClient = await AuthClient.create();
    if (!authClient.isAuthenticated()) {
      throw new Error("Not authenticated. Please login first.");
    }
    backendActor = createActor(backendCanisterId, {
      agentOptions: {
        identity: authClient.getIdentity(),
        host:
          process.env.DFX_NETWORK === "ic"
            ? "https://icp-api.io"
            : "http://localhost:4943",
      },
    });
  }
  return backendActor;
}

export async function resetBackendActor() {
  backendActor = null;
  currentCanisterId = null;
}
