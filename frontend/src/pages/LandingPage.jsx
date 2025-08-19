import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import MarketplaceSection from "../components/MarketplaceSection";
import React, { useState, useEffect, useRef } from "react";
import Benefits from "../components/Benefits";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

export default function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);

  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <MarketplaceSection backendActor={backendActor} principal={principal} />
      <Benefits />
      <CallToAction />
    </div>
  );
}
