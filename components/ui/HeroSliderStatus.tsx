// components/ui/HeroSliderStatus.tsx

interface HeroSliderStatusProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export default function HeroSliderStatus({
  total,
  current,
  onChange,
}: HeroSliderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`block h-1 transition-all duration-300 ${
            index === current ? "w-16 bg-white" : "w-10 bg-white/40"
          }`}
        />
      ))}
    </div>
  );
}
