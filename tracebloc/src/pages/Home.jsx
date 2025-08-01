// pages/home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">TraceBloc</h1>
        <p className="text-gray-300 text-lg mb-8">
          Your trusted platform for transparent and secure product tracking. Powered by Blockchain and built for authenticity.
        </p>
        <div className="flex flex-wrap gap-6">
          <a
            href="/register"
            className="bg-orange-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-orange-600"
          >
            Get Started
          </a>
          <a
            href="/dashboard"
            className="border border-orange-500 text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-black"
          >
            Go to Dashboard
          </a>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-orange-400 mb-2">Secure Verification</h2>
            <p className="text-gray-400">Every checkpoint and proof is secured using cryptographic hashes.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-orange-400 mb-2">Live Tracking</h2>
            <p className="text-gray-400">Track product journey in real-time, across trusted checkpoints.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-orange-400 mb-2">QR Code Scanner</h2>
            <p className="text-gray-400">Scan & verify product ID instantly with our QR scanner.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;