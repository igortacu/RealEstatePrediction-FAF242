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
    id: 1,
    quote: "I want to payoff my debt to USA asap",
    name: "Volodîmîr Zelenski",
    role: "First-time Investor",
    avatarUrl: "https://preview.redd.it/e4nfqmo0pfk81.png?auto=webp&s=e666d105c98565e3f73034f23332354d29605cf5",
  },
  {
    id: 2,
    quote: "The prediction worked perfectly, now i can bomb ukraine again!",
    name: "Vladimir Putin",
    role: "Real Estate Developer",
    avatarUrl: "https://content.imageresizer.com/images/memes/Putin-with-a-gun-meme-meme-9.jpg",
  },
  {
    id: 3,
    quote: "The comparison tool saved me from making a costly investment mistake. Now i can put bigger tariffs!",
    name: "Donald Trump",
    role: "Property Portfolio Manager",
    avatarUrl: "https://content.imageresizer.com/images/memes/Donald-Trump-mad-meme-4.jpg",
  },
];

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