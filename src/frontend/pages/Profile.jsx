import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import PrincipalAvatar from "../components/PrincipalAvatar";
import { motion } from "framer-motion";

export default function Profile({ backendActor, principal, onLogout }) {
  const [userData, setUserData] = useState({
    assetsCreated: 0,
    sharesOwned: 0,
    totalInvested: 0n, // Initialize as BigInt
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assets, shares] = await Promise.all([
          backendActor.getAllAssets(),
          backendActor.getSharesForOwner(Principal.fromText(principal)),
        ]);

        const assetsCreated = assets.filter(
          (a) => a.creator.toString() === principal,
        ).length;

        // Use BigInt for accumulation
        const totalInvested = shares.reduce(
          (sum, share) => sum + BigInt(share.price),
          0n, // Start with BigInt zero
        );

        setUserData({
          assetsCreated,
          sharesOwned: shares.length,
          totalInvested,
        });
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [principal, backendActor]);

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-800 p-8 shadow-lg">
        <div className="mb-8 flex items-center">
          <PrincipalAvatar principal={principal} size={12} />
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-white">Your Profile</h1>
            <p className="text-sm break-all text-gray-400">{principal}</p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <motion.div
            className="rounded-xl border border-gray-800 p-4 transition-all duration-300 hover:bg-gray-900/30"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-sm font-medium text-blue-400">
              Assets Created
            </h3>
            <p className="text-2xl font-bold text-white">
              {userData.assetsCreated}
            </p>
          </motion.div>

          <motion.div
            className="rounded-xl border border-gray-800 p-4 transition-all duration-300 hover:bg-gray-900/30"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-sm font-medium text-green-400">Shares Owned</h3>
            <p className="text-2xl font-bold text-white">
              {userData.sharesOwned}
            </p>
          </motion.div>

          <motion.div
            className="rounded-xl border border-gray-800 p-4 transition-all duration-300 hover:bg-gray-900/30"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-sm font-medium text-purple-400">
              Total Invested
            </h3>
            <p className="text-2xl font-bold text-white">
              ${userData.totalInvested.toString()}
            </p>
          </motion.div>
        </div>

        <motion.button
          onClick={onLogout}
          className="w-full rounded-lg bg-red-600/90 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Logout
        </motion.button>
      </div>
    </section>
  );
}
