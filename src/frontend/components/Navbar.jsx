// import { Link, useNavigate } from "react-router-dom";
// import { FaChevronDown, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // PrincipalAvatar component (copied from your logic)
// function PrincipalAvatar({ principal, size = 8 }) {
//   // Simple deterministic color based on principal
//   const colors = [
//     "bg-blue-500",
//     "bg-green-500",
//     "bg-purple-500",
//     "bg-red-500",
//     "bg-yellow-500",
//     "bg-pink-500",
//   ];
//   const colorIndex = principal
//     ? principal.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
//       colors.length
//     : 0;

//   return (
//     <div
//       className={`inline-flex items-center justify-center h-${size} w-${size} rounded-full ${colors[colorIndex]}`}
//     >
//       <span className="text-xs font-medium text-white">
//         {principal ? principal.substring(0, 4) : "----"}
//       </span>
//     </div>
//   );
// }

// export default function Navbar({ isAuthenticated, principal, onLogout }) {
//   const [navOpen, setNavOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const links = [
//     { name: "Home", href: "/" },
//     { name: "Marketplace", href: "/marketplace" },
//     { name: "Dashboard", href: "/dashboard" },
//   ];

//   const toggleNav = () => setNavOpen(!navOpen);
//   const handleLinkClick = () => setNavOpen(false);

//   const logout = () => {
//     onLogout();
//     setDropdownOpen(false);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Extract first name or first part of principal for display
//   const getDisplayName = () => {
//     if (!principal) return "User";
//     // If principal is an email, use the part before @
//     if (principal.includes("@")) return principal.split("@")[0];
//     // If principal contains spaces, use first name
//     if (principal.includes(" ")) return principal.split(" ")[0];
//     return principal;
//   };

//   return (
//     <header className="fixed top-0 left-0 z-50 w-full bg-black/80 shadow-lg backdrop-blur-md">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <motion.div
//           onClick={() => navigate("/")}
//           className="cursor-pointer text-2xl font-bold text-white"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           RWA Tokenization
//         </motion.div>

//         {/* Desktop Menu */}
//         <nav className="hidden items-center space-x-8 md:flex">
//           {links.map((link) => (
//             <motion.div
//               key={link.name}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 to={link.href}
//                 className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
//               >
//                 {link.name}
//               </Link>
//             </motion.div>
//           ))}

//           {isAuthenticated ? (
//             <div className="relative" ref={dropdownRef}>
//               <motion.div
//                 className="flex cursor-pointer items-center gap-2"
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <PrincipalAvatar principal={principal} size={10} />
//                 <FaChevronDown
//                   className={`text-gray-300 transition-transform ${
//                     dropdownOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </motion.div>

//               <AnimatePresence>
//                 {dropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-gray-950 bg-black shadow-lg"
//                   >
//                     <div className="border-b border-gray-800 px-4 py-3">
//                       <p className="text-sm font-medium text-white">
//                         {getDisplayName()}
//                       </p>
//                       {principal && (
//                         <p className="mt-1 text-xs text-gray-400">
//                           {principal.includes("@") ? principal : "Principal"}
//                         </p>
//                       )}
//                     </div>
//                     <div className="py-1">
//                       <button
//                         onClick={() => {
//                           navigate("/profile");
//                           setDropdownOpen(false);
//                         }}
//                         className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-950 hover:text-white"
//                       >
//                         My Profile
//                       </button>
//                       <button
//                         onClick={() => {
//                           navigate("/dashboard");
//                           setDropdownOpen(false);
//                         }}
//                         className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-950 hover:text-white"
//                       >
//                         Dashboard
//                       </button>
//                       <button
//                         onClick={logout}
//                         className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-950 hover:text-white"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="ml-4 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-lg transition-colors duration-200 hover:bg-indigo-700"
//               >
//                 Get Started
//               </button>
//             </motion.div>
//           )}
//         </nav>

//         {/* Mobile Toggle */}
//         <motion.button
//           onClick={toggleNav}
//           className="p-2 text-white focus:outline-none md:hidden"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           aria-label="Toggle menu"
//         >
//           {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </motion.button>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {navOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="absolute top-full right-0 left-0 overflow-hidden bg-black shadow-xl backdrop-blur-lg md:hidden"
//             >
//               <div className="flex flex-col px-6 py-3">
//                 {isAuthenticated && (
//                   <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-2">
//                     <PrincipalAvatar principal={principal} size={10} />
//                     <div>
//                       <p className="text-sm font-medium text-white">
//                         {getDisplayName()}
//                       </p>
//                       {principal && (
//                         <p className="text-xs text-gray-400">
//                           {principal.includes("@") ? principal : "Principal"}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//                 {links.map((link) => (
//                   <motion.div
//                     key={link.name}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Link
//                       to={link.href}
//                       onClick={handleLinkClick}
//                       className="block rounded-lg px-4 py-3 text-lg text-white transition-colors duration-200 hover:bg-gray-950"
//                     >
//                       {link.name}
//                     </Link>
//                   </motion.div>
//                 ))}
//                 {isAuthenticated ? (
//                   <>
//                     <motion.button
//                       className="my-3 rounded bg-black px-5 py-3 text-left font-medium text-white hover:bg-gray-950"
//                       onClick={() => {
//                         navigate("/dashboard");
//                         handleLinkClick();
//                       }}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       Dashboard
//                     </motion.button>
//                     <motion.button
//                       className="my-3 rounded bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
//                       onClick={() => {
//                         logout();
//                         handleLinkClick();
//                       }}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       Logout
//                     </motion.button>
//                   </>
//                 ) : (
//                   <motion.button
//                     className="my-3 rounded bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
//                     onClick={() => {
//                       navigate("/signup");
//                       handleLinkClick();
//                     }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Get Started
//                   </motion.button>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import WalletConnect from "./WalletConnect";
import { Link, useNavigate } from "react-router-dom";

function PrincipalAvatar({ principal, size = 8 }) {
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
      className={`inline-flex h-${size} w-${size} items-center justify-center rounded-full ${colors[colorIndex]}`}
    >
      <span className="text-xs font-medium text-white">
        {principal ? principal.substring(0, 4) : "----"}
      </span>
    </div>
  );
}

export default function Navbar({
  isAuthenticated,
  principal,
  onLogout,
  onAuthenticated,
}) {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const sections = [
    { name: "Home", id: "hero" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Marketplace", id: "marketplace" },
    { name: "Benefits", id: "benefits" },
  ];
  const links = [
    { name: "Dashboard", id: "/dashboard" },
    { name: "Marketplace Page", id: "/marketplace" },
    { name: "My Assets", id: "/profile" },
  ];

  const toggleNav = () => setNavOpen(!navOpen);
  const handleLinkClick = (section) => {
    setNavOpen(false);
    navigate(section.id);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setNavOpen(false);
  };

  const logout = () => {
    onLogout();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDisplayName = () => {
    if (!principal) return "User";
    if (principal.includes("@")) return principal.split("@")[0];
    if (principal.includes(" ")) return principal.split(" ")[0];
    return principal;
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/80 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-bold text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Rex RWA
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden items-center space-x-8 md:flex">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
            >
              {section.name}
            </motion.button>
          ))}

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <motion.div
                className="flex cursor-pointer items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PrincipalAvatar principal={principal} size={10} />
                <FaChevronDown
                  className={`text-gray-300 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-gray-950 bg-black shadow-lg"
                  >
                    <div className="border-b border-gray-800 px-4 py-3">
                      <p className="text-sm font-medium text-white">
                        {getDisplayName()}
                      </p>
                      {principal && (
                        <p className="mt-1 text-xs text-gray-400">
                          {principal.includes("@") ? principal : "Principal"}
                        </p>
                      )}
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate("/marketplace");
                          setDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-950 hover:text-white"
                      >
                        Marketplace
                      </button>
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-950 hover:text-white"
                      >
                        My Assets
                      </button>
                      <button
                        onClick={logout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-950 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <WalletConnect
              onAuthenticated={onAuthenticated}
              className="ml-4 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white shadow-lg transition-colors duration-200 hover:bg-indigo-700"
              buttonText="Get Started"
            />
          )}
        </nav>

        {/* Mobile Toggle */}
        <motion.button
          onClick={toggleNav}
          className="p-2 text-white focus:outline-none md:hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full right-0 left-0 overflow-hidden bg-black shadow-xl backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col px-6 py-3">
                {isAuthenticated && (
                  <div className="mb-4 flex items-center gap-3 rounded-lg bg-[#121212] px-4 py-2">
                    <PrincipalAvatar principal={principal} size={10} />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {getDisplayName()}
                      </p>
                      {principal && (
                        <p className="text-xs text-gray-400">
                          {principal.includes("@") ? principal : "Principal"}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="rounded-lg px-4 py-3 text-left text-lg text-white transition-colors duration-200 hover:bg-gray-950"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {section.name}
                  </motion.button>
                ))}
                {isAuthenticated ? (
                  <div className="flex w-full flex-col">
                    {links.map((section) => (
                      <motion.button
                        key={section.id}
                        onClick={() => handleLinkClick(section)}
                        className="rounded-lg px-4 py-3 text-left text-lg text-white transition-colors duration-200 hover:bg-gray-950"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {section.name}
                      </motion.button>
                    ))}
                    <button
                      onClick={logout}
                      className="my-3 rounded bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <WalletConnect
                    onAuthenticated={onAuthenticated}
                    className="my-3 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
                    buttonText="Get Started"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
