import React, { 
  type KeyboardEvent, 
  forwardRef,
  type ForwardedRef
} from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  onClick: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

const PricingCard = React.forwardRef<HTMLButtonElement, PricingCardProps>(
  ({ title, price, features, isFeatured = false, onClick, onKeyDown }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={`
          flex flex-col items-center text-center w-full sm:w-auto
          transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isFeatured 
            ? 'bg-[#34495e] text-white md:-translate-y-[30px] min-h-[calc(100%+48px)] z-10' 
            : 'bg-white text-[#34495e] text-sm'
          }
        `}
      >
        <div className="w-full px-6">
          <h2 className="text-lg font-bold mt-6 mb-4">{title}</h2>
          <div className="text-4xl font-bold mb-4">${price}</div>
          <hr className={`h-px bg-[#E5E7EB] w-full ${isFeatured ? 'px-0' : 'px-6'}`} />
          <div className="mb-3" />
        </div>

        <div className="w-full px-6">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <div className="py-2 text-sm">{feature}</div>
              {index < features.length - 1 && (
                <hr className={`h-px bg-[#E5E7EB] w-full ${isFeatured ? 'px-0' : 'px-6'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-auto w-full min-h-[100px] flex items-center justify-center uppercase px-6">
          Subscribe
        </div>
      </button>
    );
  }
);

export default PricingCard;