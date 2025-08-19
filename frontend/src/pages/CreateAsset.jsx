import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiImage,
  FiDollarSign,
  FiShare2,
  FiMapPin,
} from "react-icons/fi";

export default function CreateAsset({ backendActor, principal }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    valuation: "",
    totalShares: "",
    images: [""],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const request = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        valuation: parseInt(formData.valuation),
        totalShares: parseInt(formData.totalShares),
        images: formData.images.filter((img) => img.trim() !== ""),
      };

      const result = await backendActor.createAsset(request);
      if ("ok" in result) {
        navigate(`/asset/${result.ok.id}`);
      } else {
        setError("Failed to create asset");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-white">Tokenize New Asset</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-[#2A2A3A] bg-[#020202] p-6 shadow-lg"
      >
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-red-400">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="mb-2 flex items-center text-sm font-medium text-gray-300">
            <FiPlus className="mr-2" />
            Asset Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 flex items-center text-sm font-medium text-gray-300">
            <FiPlus className="mr-2" />
            Asset Type
          </label>
          <input
            type="text"
            name="title"
            placeholder="Realestate, Art, Intellectual Property, Art & Collectibles, Precious Metals, Natural Assets
            "
            // onChange={handleChange}
            className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 flex items-center text-sm font-medium text-gray-300">
            <FiPlus className="mr-2" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 flex items-center text-sm font-medium text-gray-300">
            <FiMapPin className="mr-2" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center text-sm font-medium text-gray-300">
              <FiDollarSign className="mr-2" />
              Total Valuation (USD)
            </label>
            <input
              type="number"
              name="valuation"
              value={formData.valuation}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
              min="1"
              required
            />
          </div>
          <div>
            <label className="mb-2 flex items-center text-sm font-medium text-gray-300">
              <FiShare2 className="mr-2" />
              Number of Shares
            </label>
            <input
              type="number"
              name="totalShares"
              value={formData.totalShares}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
              min="1"
              required
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="mb-4 flex items-center text-sm font-medium text-gray-300">
            <FiImage className="mr-2" />
            Image URLs
          </label>
          {formData.images.map((url, index) => (
            <div key={index} className="mb-3 flex">
              <input
                type="url"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="flex-1 rounded-lg border border-[#2A2A3A] bg-[#0A0A0A] p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 flex items-center text-sm text-indigo-400 hover:text-indigo-300"
          >
            <FiPlus className="mr-1" size={14} />
            Add another image URL
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition-colors hover:bg-indigo-700 ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
              Tokenizing...
            </span>
          ) : (
            "Tokenize Asset"
          )}
        </button>
      </form>
    </div>
  );
}
