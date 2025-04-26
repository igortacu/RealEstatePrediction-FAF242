import React from 'react';
import { Building, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-white mb-4">
              <Building size={24} className="text-blue-500" />
              <span className="text-lg font-bold">PropertyAI</span>
            </div>
            <p className="text-slate-400 text-sm">
              Intelligent real estate predictions and investment analysis for informed decision making.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Features
            </h3>
            <ul className="space-y-3">
              {['Mortgage Calculator', 'Investment Analysis', 'Price Predictions', 'Property Comparison'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {['Blog', 'Market Reports', 'Guides', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} PropertyAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;