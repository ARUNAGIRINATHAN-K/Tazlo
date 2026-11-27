import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md';
}

export function RatingStars({ rating, size = 'sm' }: RatingStarsProps) {
  const iconClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[#B49A70]"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star - 0.25;
        return (
          <Star
            key={star}
            className={`${iconClass} ${filled ? 'fill-[#B49A70] text-[#B49A70]' : 'text-[#D6CEC2]'}`}
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}
