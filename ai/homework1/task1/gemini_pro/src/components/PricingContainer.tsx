// src/components/PricingCardContainer.tsx

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { PricingCard } from './PricingCard';

const pricingData = [
  {
    title: 'Standard',
    price: '100',
    features: ['50,000 Requests', '4 contributors', 'Up to 3 GB storage space'],
  },
  {
    title: 'Pro',
    price: '200',
    features: ['100,000 Requests', '7 contributors', 'Up to 6 GB storage space'],
  },
  {
    title: 'Expert',
    price: '500',
    features: ['100,000 Requests', '11 contributors', 'Up to 10 GB storage space'],
  },
];

export const PricingCardContainer = () => {
  // Default to the "Pro" plan (index 1)
  const [activeIndex, setActiveIndex] = useState(1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Effect to focus the active card when the index changes via keyboard
  useEffect(() => {
    cardRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let newIndex = activeIndex;
    if (e.key === 'ArrowRight' || e.key === 'Tab') {
      e.preventDefault(); // Prevent default Tab behavior
      newIndex = (activeIndex + 1) % pricingData.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (activeIndex - 1 + pricingData.length) % pricingData.length;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div
      className="flex justify-center sm:items-end flex-col sm:flex-row gap-5 sm:gap-0"
      onKeyDown={handleKeyDown}
      role="listbox"
    >
      {pricingData.map((plan, index) => (
        <PricingCard
          key={plan.title}
          ref={(el) => ((cardRefs.current[index] = el) as any)}
          title={plan.title}
          price={plan.price}
          features={plan.features}
          isFeatured={index === activeIndex}
          onClick={() => setActiveIndex(index)}
          // Set tabIndex to 0 for the active card, -1 for others
          tabIndex={index === activeIndex ? 0 : -1}
        />
      ))}
    </div>
  );
};

export default PricingCardContainer