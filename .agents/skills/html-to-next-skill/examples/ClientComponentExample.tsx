"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// This is a Client Component. Used for interactivity like state and animations.

export default function WishlistButton() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <button
      onClick={() => setIsSaved(!isSaved)}
      className="relative flex items-center justify-center p-3 rounded-full bg-white border border-[var(--border)] shadow-sm hover:shadow-md transition-all active:scale-95"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isSaved ? "saved" : "not-saved"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isSaved ? (
            <span className="text-red-500 text-xl">❤️</span>
          ) : (
            <span className="text-gray-400 text-xl">🤍</span>
          )}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle Wishlist</span>
    </button>
  );
}
