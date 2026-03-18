import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
}

export default function RatingStars({ rating, size = 'sm', showValue = false }: RatingStarsProps) {
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${i < Math.floor(rating) ? 'text-primary fill-primary' : 'text-border'}`}
        />
      ))}
      {showValue && <span className="text-sm font-body font-medium ml-1">{rating.toFixed(1)}</span>}
    </div>
  );
}
