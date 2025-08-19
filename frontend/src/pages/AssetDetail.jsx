import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { FiMapPin, FiDollarSign, FiPieChart, FiInfo } from "react-icons/fi";
import SharesTable from "../components/SharesTable";
import TransactionsTable from "../components/TransactionsTable";
import Loading from "../components/Loading";

export default function AssetDetail({ backendActor, principal }) {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [shares, setShares] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetResult = await backendActor.getAsset(BigInt(id));
        if ("ok" in assetResult) {
          setAsset(assetResult.ok);

          const [sharesResult, transactionsResult] = await Promise.all([
            backendActor.getSharesForAsset(BigInt(id)),
            backendActor.getTransactionsForAsset(BigInt(id)),
          ]);

          if ("ok" in sharesResult) setShares(sharesResult.ok);
          if ("ok" in transactionsResult)
            setTransactions(transactionsResult.ok);
        } else {
          setError("Asset not found");
        }
      } catch (err) {
        setError("Failed to load asset data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, backendActor]);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-red-400">
        {error}
      </div>
    );
  if (!asset)
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-gray-400">
        Asset not found
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 overflow-hidden rounded-xl border border-[#2A2A3A] bg-[#020202] shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2">
            {asset.images?.length > 0 ? (
              <img
                className="h-90 w-full object-cover"
                src={asset.images[0]}
                alt={asset.title}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#1A1A2A]">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="mb-2 text-3xl font-bold text-white">
              {asset.title}
            </h1>
            {asset.location && (
              <div className="mb-4 flex items-center">
                <FiMapPin className="mr-2 text-indigo-300" />
                <span className="text-gray-300">{asset.location}</span>
              </div>
            )}

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-4">
                <div className="flex items-center text-gray-400">
                  <FiDollarSign className="mr-2" />
                  <span className="text-sm">Valuation</span>
                </div>
                <div className="mt-1 text-xl font-bold text-white">
                  ${Number(asset.valuation).toLocaleString()}
                </div>
              </div>

              <div className="rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-4">
                <div className="flex items-center text-gray-400">
                  <FiPieChart className="mr-2" />
                  <span className="text-sm">Tokenized</span>
                </div>
                <div className="mt-1 text-xl font-bold text-white">
                  {asset.tokenizedPercentage || 0}%
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-4">
              <div className="flex items-center text-gray-400">
                <FiInfo className="mr-2" />
                <span className="text-sm">Description</span>
              </div>
              <p className="mt-2 text-gray-300">{asset.description}</p>
            </div>
          </div>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="mb-6 flex space-x-1 rounded-xl border border-[#2A2A3A] bg-[#0A0A0A] p-1">
          {["Shares", "Transaction History"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full rounded-lg py-3 text-sm font-medium transition-colors ${
                  selected
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-400 hover:bg-[#1A1A2A] hover:text-white"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="rounded-xl border border-[#2A2A3A] bg-[#020202] p-4">
          <Tab.Panel>
            <SharesTable
              shares={shares}
              assets={[asset]}
              backendActor={backendActor}
              principal={principal}
            />
          </Tab.Panel>
          <Tab.Panel>
            <TransactionsTable transactions={transactions} assets={[asset]} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
