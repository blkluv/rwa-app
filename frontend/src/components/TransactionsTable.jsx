import { FiArrowRight, FiShoppingCart, FiRefreshCw } from "react-icons/fi";

export default function TransactionsTable({ transactions, assets }) {
  const getAssetName = (assetId) => {
    const asset = assets.find((a) => a.id === assetId);
    return asset ? asset.title : `Asset ${assetId}`;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-[#2A2A3A]">
      <table className="min-w-full divide-y divide-[#2A2A3A]">
        <thead className="bg-[#0A0A0A]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Asset
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
              Counterparty
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2A2A3A] bg-[#020202]">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx.id} className="transition-colors hover:bg-[#0A0A0A]">
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-400">
                  {new Date(Number(tx.timestamp / 1000000n)).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-white">
                  {getAssetName(tx.assetId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {tx.price > 0 ? (
                      <FiShoppingCart
                        className="mr-1 text-indigo-400"
                        size={14}
                      />
                    ) : (
                      <FiRefreshCw className="mr-1 text-gray-400" size={14} />
                    )}
                    <span
                      className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                        tx.price > 0
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {tx.price > 0 ? "Purchase" : "Transfer"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-300">
                  {tx.price > 0
                    ? `${Number(tx.price).toLocaleString()} ICP`
                    : "Free Transfer"}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-400">
                  <div className="flex items-center">
                    <span className="text-indigo-300">
                      {tx.seller.toString().substring(0, 8)}...
                    </span>
                    <FiArrowRight className="mx-2 text-gray-500" size={14} />
                    <span className="text-green-300">
                      {tx.buyer.toString().substring(0, 8)}...
                    </span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
