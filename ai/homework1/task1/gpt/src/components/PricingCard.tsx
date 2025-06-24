import React, { 
  type KeyboardEvent, 
  forwardRef,
  type ForwardedRef,
  useEffect
} from 'react';

export interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  onClick: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  focusRef?: React.RefObject<HTMLDivElement>;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isFeatured = false,
  onClick,
  onNext,
  onPrev,
  focusRef,
}) => {
  // Handle keyboard navigation: ArrowRight, ArrowLeft, and Tab → next
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'Tab') {
      e.preventDefault();
      onNext && onNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onPrev && onPrev();
    }
  };

  // When this card becomes featured, move DOM focus to it
  useEffect(() => {
    if (isFeatured && focusRef && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isFeatured, focusRef]);

  return (
    <div
      role="button"
      tabIndex={0}
      ref={focusRef}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`
        cursor-pointer
        rounded-2xl
        text-center
        flex-shrink-0
        select-none
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500
        w-full
        sm:w-auto
        ${
          isFeatured
            ? 'bg-[#34495e] text-white transform translate-y-[0px] sm:-translate-y-[30px] pt-12 pb-12'
            : 'bg-white text-[#34495e] pt-6 pb-6'
        }
      `}
    >
      {/* Title */}
      <div className="px-6">
        <h2 className={`${isFeatured ? 'text-white' : 'text-[#34495e]'} text-xl font-semibold`}>
          {title}
        </h2>
      </div>

      {/* Price */}
      <div className="px-6 mt-4">
        <span className="text-[36px] font-bold">
          ${price}
        </span>
      </div>

      {/* Divider under price */}
      <div
        className={`w-full bg-[#E5E7EB] h-px mt-4 mb-3 ${
          isFeatured ? 'px-0' : 'px-6'
        }`}
      />

      {/* Features list */}
      <div className="w-full">
        {features.map((feat, idx) => (
          <React.Fragment key={idx}>
            <div className="px-6 py-2 text-sm">
              {feat}
            </div>
            {/* Divider after each feature */}
            <div className={`w-full bg-[#E5E7EB] h-px mb-3 ${isFeatured ? 'px-0' : 'px-6'}`} />
          </React.Fragment>
        ))}
      </div>

      {/* Subscribe button at bottom */}
      <div className="w-full mt-auto">
        <button
          type="button"
          tabIndex={-1}
          className={`
            w-full
            min-h-[100px]
            pt-4 pb-4
            uppercase
            font-semibold
            bg-transparent
            border-none
            ${isFeatured ? 'text-white' : 'text-[#34495e]'}
          `}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default PricingCard;