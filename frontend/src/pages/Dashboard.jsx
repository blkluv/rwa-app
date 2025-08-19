import { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { Tab } from "@headlessui/react";
import SharesTable from "../components/SharesTable";
import TransactionsTable from "../components/TransactionsTable";
import PortfolioSummary from "../components/PortfolioSummary";

export default function Dashboard({ backendActor, principal }) {
  const [assets, setAssets] = useState([]);
  const [shares, setShares] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetsData, sharesData, transactionsData] = await Promise.all([
          backendActor.getActiveAssets(),
          backendActor.getSharesForOwner(Principal.fromText(principal)),
          backendActor.getTransactionsForUser(Principal.fromText(principal)),
        ]);
        setAssets(assetsData);
        setShares(sharesData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (principal) {
      fetchData();
    }
  }, [principal, backendActor]);

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Portfolio</h1>

      <PortfolioSummary shares={shares} />

      <Tab.Group>
        <Tab.List className="mb-6 flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              `ring-opacity-60 w-full rounded-lg py-2.5 text-sm leading-5 font-medium text-blue-700 ring-gray-600 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none ${selected ? "bg-gray-900 shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
            }
          >
            Your Shares
          </Tab>
          <Tab
            className={({ selected }) =>
              `ring-opacity-60 w-full rounded-lg py-2.5 text-sm leading-5 font-medium text-blue-700 ring-gray-600 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none ${selected ? "bg-gray-900 shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
            }
          >
            Transaction History
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <SharesTable
              shares={shares}
              assets={assets}
              backendActor={backendActor}
              principal={principal}
            />
          </Tab.Panel>
          <Tab.Panel>
            <TransactionsTable transactions={transactions} assets={assets} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
