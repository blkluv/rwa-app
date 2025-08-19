import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import WalletConnect from "./WalletConnect";

export default function CallToAction() {
  return (
    <section id="cta" className="mx-auto max-w-7xl px-4 py-20">
      <div className="rounded-xl bg-indigo-500 p-8 md:p-12">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mr-8 md:mb-0">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="max-w-2xl text-sm text-indigo-100">
              Join our platform today and begin your journey into tokenized
              asset ownership.
            </p>
          </div>

          {/* <motion.div
            className="flex items-center justify-center rounded-lg bg-black px-6 py-3 font-medium text-indigo-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          > */}

          {/* </motion.div> */}
          <div className="rounded border">
            <WalletConnect />
          </div>
        </div>
      </div>
    </section>
  );
}
