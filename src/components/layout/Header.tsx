import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdvancedButton } from '../ui/AdvancedButton';
import { Logo } from '../ui/Logo';
import { SearchBar } from '../ui/SearchBar';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'Services', 'About', 'Portfolio', 'Contact'];

  return (
    <motion.header 
      className="fixed top-0 w-full z-50 bg-gradient-to-r from-black/30 via-gray-900/30 to-black/30 backdrop-blur-xl border-b border-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-white/90 hover:text-white font-medium transition-colors group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <AdvancedButton variant="gradient" size="sm" animation="hover-glow" className="px-6 py-2">
              Get Started
            </AdvancedButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              className="w-6 h-0.5 bg-white mb-1"
            />
            <motion.div
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-white mb-1"
            />
            <motion.div
              animate={{ rotate: isOpen ? -45 : 0 }}
              className="w-6 h-0.5 bg-white"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/40 backdrop-blur-lg rounded-lg mt-2 p-4"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-white/80 hover:text-white py-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
