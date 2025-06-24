import React, {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent
} from 'react';

import PricingCard from './PricingCard';

const PricingCardContainer = () => {
  const plans = [
    {
      title: 'Standard plan',
      price: '100',
      features: ['50,000 Requests', '4 contributors', 'Up to 3 GB storage space']
    },
    {
      title: 'Pro plan',
      price: '200',
      features: ['100,000 Requests', '7 contributors', 'Up to 6 GB storage space']
    },
    {
      title: 'Expert plan',
      price: '500',
      features: ['100,000 Requests', '11 contributors', 'Up to 10 GB storage space']
    }
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, plans.length);
  }, [plans.length]);

  const handleKeyNavigation = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'Tab') {
      e.preventDefault();
      const nextIndex = (index + 1) % plans.length;
      setActiveIndex(nextIndex);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + plans.length) % plans.length;
      setActiveIndex(prevIndex);
    }
  };

  useEffect(() => {
    cardRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:gap-0">
      {plans.map((plan, index) => (
        <PricingCard
          key={index}
          ref={el => cardRefs.current[index] = el}
          title={plan.title}
          price={plan.price}
          features={plan.features}
          isFeatured={activeIndex === index}
          onClick={() => setActiveIndex(index)}
          onKeyDown={(e) => handleKeyNavigation(e, index)}
        />
      ))}
    </div>
  );
};


export default PricingCardContainer;