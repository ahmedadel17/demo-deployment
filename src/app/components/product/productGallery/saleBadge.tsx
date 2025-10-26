// Sale Badge Component
interface SaleBadgeProps {
  discount?: string;
}

function SaleBadge({ discount = "20% OFF" }: SaleBadgeProps) {
  return (
    <div className="absolute top-4 start-4">
      <span className="product-badge bg-red-500/20 text-red-500 px-2 py-1 text-xs font-semibold rounded-full">
        {discount}
      </span>
    </div>
  );
}

export default SaleBadge;