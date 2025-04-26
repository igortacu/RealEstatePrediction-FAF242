import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-blue-400">
            Testimonials
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight">
            What our clients are saying
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-2 -mr-2 h-20 w-20 text-blue-500/10">
                <Quote size={80} />
              </div>
              
              <div className="relative">
                <p className="text-base italic text-slate-300 mb-6">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-blue-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;