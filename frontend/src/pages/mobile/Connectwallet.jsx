import React from "react";
import WalletConnect from "../../components/WalletConnect";
import { FaWallet } from "react-icons/fa";

const Connectwallet = () => {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <FaWallet className="text-7xl text-center animate-pulse text-indigo-500" />
        </div>
        <h1 className="text-3xl font-light mb-4">Connect Your Wallet</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Connect your wallet using Internet Identity or NFID to get access
        </p>
      </div>

      <div className="border border-gray-800 rounded hover:border-none">
        <WalletConnect />
      </div>
    </div>
  );
};

export default Connectwallet;
