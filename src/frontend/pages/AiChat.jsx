import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiUser, FiMessageSquare } from "react-icons/fi";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Hello! I'm Rex-x, your RWA investment assistant. I specialize in real world assets. What would you like to know?",
      displayText: "",
      isTyping: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Auto-scroll to bottom when messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // Handle typing animation
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage.role === "ai" &&
      lastMessage.isTyping &&
      lastMessage.displayText.length < lastMessage.content.length
    ) {
      typingIntervalRef.current = setInterval(() => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.displayText.length < lastMsg.content.length) {
            lastMsg.displayText = lastMsg.content.substring(
              0,
              lastMsg.displayText.length + 1,
            );
          } else {
            lastMsg.isTyping = false;
            clearInterval(typingIntervalRef.current);
          }
          return updated;
        });
      }, 20); // Adjust typing speed here
    }

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isWaitingForResponse) return;

    const userMessage = {
      role: "user",
      content: inputValue,
      displayText: inputValue,
      isTyping: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsWaitingForResponse(true);

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are Rex-x, an expert AI investment advisor specializing in Real World Assets (RWA). 
  
  Guidelines:
  - Respond in 1-2 short sentences
  - Focus on RWA (real estate, commodities, infrastructure)
  - Provide current market insights
  - Suggest 1 actionable strategy
  - Mention key risk factor
  - No formatting or markdown
  - Maximum 3 sentences
  
  Query: "${inputValue}"
  
  Provide concise RWA advice:`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 150,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: aiResponse,
          displayText: "",
          isTyping: true,
        },
      ]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Connection issue. Please try again.",
          displayText: "Connection issue. Please try again.",
          isTyping: false,
        },
      ]);
    } finally {
      setIsWaitingForResponse(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black text-white">
      {/* Fixed Header */}
      <header className="shrink-0 border-b border-gray-800 bg-gray-900/50 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
            <FiMessageSquare className="text-purple-400" size={20} />
          </div>
          <h1 className="text-xl font-bold">Rex-x RWA Advisor</h1>
        </div>
      </header>

      {/* Scrollable Chat Area */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <div className="mx-auto max-w-4xl space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3 ${
                      message.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-900 text-gray-100"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      {message.role === "user" ? (
                        <FiUser className="text-indigo-200" size={14} />
                      ) : (
                        <FiMessageSquare
                          className="text-purple-400"
                          size={14}
                        />
                      )}
                      <span className="text-xs font-semibold">
                        {message.role === "user" ? "You" : "Rex-x"}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">
                      {message.displayText || message.content}
                      {message.isTyping && (
                        <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-400 align-middle"></span>
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="shrink-0 border-t border-gray-800 bg-gray-950/50 px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about RWA investments..."
            className="flex-1 rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            disabled={isWaitingForResponse}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={isWaitingForResponse || !inputValue.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white disabled:bg-gray-700"
          >
            <FiSend />
          </motion.button>
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="shrink-0 border-t border-gray-800 bg-black py-3 text-center text-xs text-gray-400">
        <p>AI suggestions are informational only. Invest at your own risk.</p>
      </footer>
    </div>
  );
}
