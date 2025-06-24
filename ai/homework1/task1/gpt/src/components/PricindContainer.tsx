import React, {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent
} from 'react';
import PricingCard from './PricingCard';

interface Plan {
  title: string;
  price: string;
  features: string[];
}

const plans: Plan[] = [
  {
    title: 'Standard plan',
    price: '100',
    features: ['50,000 Requests', '4 contributors', 'Up to 3 GB storage space'],
  },
  {
    title: 'Pro plan',
    price: '200',
    features: ['100,000 Requests', '7 contributors', 'Up to 6 GB storage space'],
  },
  {
    title: 'Expert plan',
    price: '500',
    features: ['100,000 Requests', '11 contributors', 'Up to 10 GB storage space'],
  },
];

export const PricingCardContainer: React.FC = () => {
  // Default featured index = 1 (Pro plan)
  const [featuredIndex, setFeaturedIndex] = useState<number>(1);

  // Create refs for each card to manage focus
  const cardRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    plans.map(() => React.createRef<HTMLDivElement>())
  );

  // Change active card on click
  const handleCardClick = (index: number) => {
    setFeaturedIndex(index);
  };

  // Move to next: wrap around
  const handleNext = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % plans.length;
    setFeaturedIndex(nextIndex);
  };

  // Move to previous: wrap around
  const handlePrev = (currentIndex: number) => {
    const prevIndex = (currentIndex - 1 + plans.length) % plans.length;
    setFeaturedIndex(prevIndex);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start justify-center sm:gap-0 gap-y-10 w-full sm:w-auto">
      {plans.map((plan, idx) => {
        // Prepare props for PricingCard
        const cardProps: PricingCardProps = {
          title: plan.title,
          price: plan.price,
          features: plan.features,
          isFeatured: idx === featuredIndex,
          onClick: () => handleCardClick(idx),
          onNext: () => handleNext(idx),
          onPrev: () => handlePrev(idx),
          focusRef: cardRefs.current[idx],
        };
        return (
          <PricingCard
            key={plan.title}
            {...cardProps}
          />
        );
      })}
    </div>
  );
};

export default PricingCardContainer;