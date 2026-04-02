import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AnimationStoryboard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Initial State",
      description: "Cards start invisible and offset",
      cardStates: {
        card1: { opacity: 0, x: -50, y: 0, scale: 1 },
        card2: { opacity: 0, x: 50, y: 0, scale: 1 }
      }
    },
    {
      title: "Fade In Animation",
      description: "Cards fade in with smooth slide motion",
      cardStates: {
        card1: { opacity: 1, x: 0, y: 0, scale: 1 },
        card2: { opacity: 1, x: 0, y: 0, scale: 1 }
      }
    },
    {
      title: "Hover Effect",
      description: "Gentle lift and glow on hover",
      cardStates: {
        card1: { opacity: 1, x: 0, y: -8, scale: 1.02 },
        card2: { opacity: 1, x: 0, y: 0, scale: 1 }
      }
    },
    {
      title: "Interactive State",
      description: "Light reflection and shadow enhancement",
      cardStates: {
        card1: { opacity: 1, x: 0, y: -8, scale: 1.02 },
        card2: { opacity: 1, x: 0, y: -8, scale: 1.02 }
      }
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-200 max-w-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Animation Preview</h3>
      
      {/* Mini Cards Preview */}
      <div className="relative h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 overflow-hidden">
        <motion.div
          className="absolute top-2 left-2 w-12 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-lg"
          animate={steps[currentStep].cardStates.card1}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-2 right-2 w-12 h-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-lg"
          animate={steps[currentStep].cardStates.card2}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      {/* Step Info */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800">{steps[currentStep].title}</h4>
        <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm disabled:opacity-50"
        >
          Previous
        </button>
        
        <div className="flex space-x-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Auto-play toggle */}
      <button
        onClick={() => {
          const interval = setInterval(() => {
            setCurrentStep(prev => {
              const next = (prev + 1) % steps.length;
              if (next === 0) {
                clearInterval(interval);
              }
              return next;
            });
          }, 1500);
        }}
        className="w-full mt-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium"
      >
        Play Animation
      </button>
    </div>
  );
};
