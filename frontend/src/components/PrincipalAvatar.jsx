export default function PrincipalAvatar({ principal, size = 8 }) {
  // Simple deterministic color based on principal
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-pink-500",
  ];
  const colorIndex = principal
    ? principal.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length
    : 0;

  return (
    <div
      className={`inline-flex items-center justify-center h-${size} w-${size} rounded-full ${colors[colorIndex]}`}
    >
      <span className="text-xs font-medium text-white">
        {principal ? principal.substring(0, 4) : "----"}
      </span>
    </div>
  );
}
