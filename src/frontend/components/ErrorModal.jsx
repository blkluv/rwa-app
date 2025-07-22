export default function ErrorModal({ message, onClose }) {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h3 className="mb-2 text-lg font-bold text-red-500">Error</h3>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
