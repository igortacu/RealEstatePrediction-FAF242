import React from 'react';
import { motion } from 'react-motion';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureSectionProps {
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider shiny-text">
            Powerful Features
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Make smarter property decisions
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-slate-300">
            Our sophisticated tools help you analyze, compare, and project real estate investments with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900/30 text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-slate-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;