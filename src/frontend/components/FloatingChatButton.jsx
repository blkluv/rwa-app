import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiGeminiLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default function FloatingChatButton() {
  const navigate = useNavigate();

  // Load saved position or default to bottom right
  const [position, setPosition] = useState(() => {
    const savedPos = localStorage.getItem("aiChatButtonPosition");
    return savedPos
      ? JSON.parse(savedPos)
      : { x: window.innerWidth - 80, y: window.innerHeight - 80 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("aiChatButtonPosition", JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Keep within viewport bounds
    const boundedX = Math.max(10, Math.min(window.innerWidth - 70, newX));
    const boundedY = Math.max(10, Math.min(window.innerHeight - 70, newY));

    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Set up event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 70),
        y: Math.min(prev.y, window.innerHeight - 70),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className={`fixed z-50 flex h-14 w-14 cursor-grab items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg ${
        isDragging ? "cursor-grabbing shadow-xl" : "hover:shadow-xl"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onClick={() => !isDragging && navigate("/aichat")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <RiGeminiLine className="animate-pulse text-xl text-white" />
      <span className="sr-only">AI Assistant</span>
    </motion.div>
  );
}
