import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
// import { createActor } from "../../declarations/backend";
import { createActor } from "../../../src/declarations/backend";

// Pages
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import Marketplace from "../pages/Marketplace";
import AssetDetail from "../pages/AssetDetail";
import CreateAsset from "../pages/CreateAsset";
import Transactions from "../pages/Transactions";
import Profile from "../pages/Profile";
import AiChat from "../pages/AiChat";

// Components
import Navbar from "../components/Navbar";
import WalletConnect from "../components/WalletConnect";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ErrorModal from "../components/ErrorModal";
import FloatingChatButton from "../components/FloatingChatButton";

export default function App() {
  const [authClient, setAuthClient] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth client and check authentication status
  useEffect(() => {
    const initAuth = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);

        if (await client.isAuthenticated()) {
          const identity = client.getIdentity();
          const principal = identity.getPrincipal().toString();
          setPrincipal(principal);
          setIsAuthenticated(true);
          initBackendActor(identity);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        setError("Failed to initialize wallet connection");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const initBackendActor = (identity) => {
    try {
      const actor = createActor(process.env.CANISTER_ID_BACKEND, {
        agentOptions: { identity },
      });
      setBackendActor(actor);
    } catch (err) {
      console.error("Backend actor initialization failed:", err);
      setError("Failed to initialize backend connection");
    }
  };

  const handleAuthenticated = ({ authClient, identity, principal }) => {
    setAuthClient(authClient);
    setPrincipal(principal);
    setIsAuthenticated(true);
    initBackendActor(identity);
  };

  const handleLogout = async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
      setBackendActor(null);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="bg-black text-white">
      <Router>
        <div className="flex min-h-screen flex-col">
          <Navbar
            isAuthenticated={isAuthenticated}
            principal={principal}
            onLogout={handleLogout}
          />

          <main className="mt-18 pt-20 flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/marketplace"
                element={
                  isAuthenticated ? (
                    <Marketplace
                      backendActor={backendActor}
                      principal={principal}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard
                      backendActor={backendActor}
                      principal={principal}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/asset/:id"
                element={
                  isAuthenticated ? (
                    <AssetDetail
                      backendActor={backendActor}
                      principal={principal}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/create-asset"
                element={
                  isAuthenticated ? (
                    <CreateAsset
                      backendActor={backendActor}
                      principal={principal}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/transactions"
                element={
                  isAuthenticated ? (
                    <Transactions
                      backendActor={backendActor}
                      principal={principal}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  isAuthenticated ? (
                    <Profile
                      backendActor={backendActor}
                      principal={principal}
                      onLogout={handleLogout}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/aichat"
                element={
                  isAuthenticated ? (
                    <AiChat
                      backendActor={backendActor}
                      principal={principal}
                      onLogout={handleLogout}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </main>

          {!isAuthenticated && (
            <div className="fixed right-4 bottom-4">
              <WalletConnect onAuthenticated={handleAuthenticated} />
            </div>
          )}

          {isAuthenticated && <FloatingChatButton />}

          <Footer />

          {error && (
            <ErrorModal message={error} onClose={() => setError(null)} />
          )}
        </div>
      </Router>
    </div>
  );
}
