import React from 'react';

interface StepTwoProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function StepTwo({ onBack, onSubmit }: StepTwoProps) {
  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Designer Name</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
          />
        </div>
        
        <div>
          <label className="block text-sm text-white/60 mb-2">Email</label>
          <input
            type="email"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
          />
        </div>
        
        <div>
          <label className="block text-sm text-white/60 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 border border-white/30 text-white py-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 bg-white text-black py-3 rounded-lg hover:bg-white/90 transition-colors"
        >
          Submit Application
        </button>
      </div>
    </>
  );
}