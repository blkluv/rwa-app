import { useEffect, useState } from "react";
import AssetCard from "../components/AssetCard";
import { Link } from "react-router-dom";

export default function Marketplace({ backendActor, principal }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const activeAssets = await backendActor.getActiveAssets();
        setAssets(activeAssets);
      } catch (error) {
        setError("Failed to fetch assets");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [backendActor]);

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <Link
          className="rounded bg-green-600 px-4 py-4 font-medium text-white hover:bg-green-700"
          to={"/create-asset"}
        >
          List New Asset
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            backendActor={backendActor}
            principal={principal}
            showBuyButton
          />
        ))}
      </div>
    </div>
  );
}
