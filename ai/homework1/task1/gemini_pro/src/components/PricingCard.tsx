// src/components/PricingCard.tsx

import React from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  onClick: () => void;
  // tabIndex is managed by the parent for focus control
  tabIndex: number;
}

// A reusable HR component to avoid repetition
const ThemedHr = ({ isFeatured }: { isFeatured?: boolean }) => (
  <div className={isFeatured ? 'px-0' : 'px-6'}>
    <hr className="h-[1px] w-full bg-gray-200" />
  </div>
);

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ title, price, features, isFeatured = false, onClick, tabIndex }, ref) => {
    // Base classes for the card
    const baseCardClasses =
      'flex flex-col text-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-indigo-500 sm:w-auto w-full';

    // Classes for the featured (active) state
    const featuredCardClasses = 'bg-[#34495e] text-white py-12 sm:-translate-y-[-20px]';

    // Classes for the ordinary (inactive) state
    const ordinaryCardClasses = 'bg-white text-[#34495e] py-6';

    const cardClasses = `${baseCardClasses} ${isFeatured ? featuredCardClasses : ordinaryCardClasses}`;

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={onClick}
        onKeyDown={(e) => {
          // Allow clicks via the Enter/Space keys when focused
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
        tabIndex={tabIndex}
      >
        {/* Inner container for consistent padding */}
        <div className="flex h-full flex-col px-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="my-4 text-4xl font-bold">${price}</p>
          <ThemedHr isFeatured={isFeatured} />

          {/* Features list - flex-grow pushes the button to the bottom */}
          <div className="flex-grow">
            {features.map((feature, index) => (
              <div key={index} className="text-sm">
                <p className="py-2">{feature}</p>
                <ThemedHr isFeatured={isFeatured} />
              </div>
            ))}
          </div>

          {/* Subscribe Button */}
          <div className="mt-auto">
            <button
              className="min-h-[100px] w-full cursor-pointer border-none bg-transparent py-4 text-sm font-bold uppercase tracking-wider"
              tabIndex={-1} // Makes the button unfocusable
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  }
);

PricingCard.displayName = 'PricingCard';