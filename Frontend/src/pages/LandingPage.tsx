import React from 'react';
import { ChevronRight, LineChart, Home, Wallet, TrendingUp, BarChart4, Calculator } from 'lucide-react';
import HeroSection from '../components/landing/HeroSection';
import FeatureSection from '../components/landing/FeatureSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import CTASection from '../components/landing/CTASection';

interface LandingPageProps {
  onGetStarted: () => void;
}

const features = [
  {
    id: 1,
    title: 'Mortgage Analysis',
    description: 'Calculate your mortgage potential with customizable parameters for down payment, interest rate, and term length.',
    icon: <Home className="w-8 h-8 text-primary-500" />,
  },
  {
    id: 2,
    title: 'Investment Dashboard',
    description: 'Visualize property investment returns with detailed profitability projections and ROI analysis.',
    icon: <BarChart4 className="w-8 h-8 text-primary-500" />,
  },
  {
    id: 3,
    title: 'Price Trend Forecasting',
    description: 'Interactive visualization of real estate price trends with AI-powered extrapolation of future values.',
    icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
  },
  {
    id: 4,
    title: 'Property Comparison',
    description: 'Compare multiple properties side by side to make informed investment decisions based on key metrics.',
    icon: <LineChart className="w-8 h-8 text-primary-500" />,
  },
  {
    id: 5,
    title: 'Repayment Calculator',
    description: 'Plan your mortgage repayment schedule with adjustable terms and visual payment breakdowns.',
    icon: <Calculator className="w-8 h-8 text-primary-500" />,
  },
  {
    id: 6,
    title: 'Investment Recommendations',
    description: 'Receive personalized property investment recommendations based on your financial goals.',
    icon: <Wallet className="w-8 h-8 text-primary-500" />,
  },
];

const testimonials = [
  {
    id: 4,
    quote: "This tool has transformed how I manage my portfolio. I've never felt more confident in my investments!",
    name: "Alice Johnson",
    role: "Financial Analyst",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 6,
    quote: "I recommended this platform to all my colleagues. The insights are simply unmatched.",
    name: "Sofia Martinez",
    role: "Marketing Manager",
    avatarUrl: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    id: 7,
    quote: "The real-time analytics keep me ahead of the curve. Highly recommend to any savvy investor!",
    name: "David Chen",
    role: "Data Scientist",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
  }
]


const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection onGetStarted={onGetStarted} />
      <FeatureSection features={features} />
      <TestimonialSection testimonials={testimonials} />
      <CTASection onGetStarted={onGetStarted} />
    </div>
  );
};

export default LandingPage;