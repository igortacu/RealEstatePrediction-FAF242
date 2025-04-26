import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
          
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to make smarter property investments?
              </h2>
              <p className="mt-6 text-xl text-slate-300">
                Access our advanced analytics dashboard and start making data-driven real estate decisions today.
              </p>
              <div className="mt-10">
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;