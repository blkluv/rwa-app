import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">RWA</span>
              <span className="ml-2 text-gray-400">Tokenization</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Powered by Internet Computer
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RWA Tokenization. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
