import React from 'react';

interface StepOneProps {
  onNext: () => void;
}

export function StepOne({ onNext }: StepOneProps) {
  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Brand Name</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
          />
        </div>
        
        <div>
          <label className="block text-sm text-white/60 mb-2">Portfolio Website</label>
          <input
            type="url"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
          />
        </div>
        
        <div>
          <label className="block text-sm text-white/60 mb-2">Design Philosophy</label>
          <textarea
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full mt-8 bg-white text-black py-3 rounded-lg hover:bg-white/90 transition-colors"
      >
        Continue
      </button>
    </>
  );
}