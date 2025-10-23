import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketPrice {
  commodity: string;
  price: number;
  change: number;
  changePercent: number;
}

const MarketTicker = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([
    { commodity: "Soybean", price: 5240, change: 120, changePercent: 2.3 },
    { commodity: "Mustard", price: 6180, change: -85, changePercent: -1.4 },
    { commodity: "Groundnut", price: 5890, change: 45, changePercent: 0.8 },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prices.length);
      
      setPrices((prev) =>
        prev.map((p) => ({
          ...p,
          change: p.change + (Math.random() - 0.5) * 20,
          changePercent: Number((p.changePercent + (Math.random() - 0.5) * 0.5).toFixed(2)),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [prices.length]);

  const currentPrice = prices[currentIndex];
  const isPositive = currentPrice.change >= 0;

  return (
    <div
      className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/50"
      data-testid="market-ticker"
    >
      <span className="text-xs font-medium text-muted-foreground">
        {currentPrice.commodity}:
      </span>
      <span className="text-sm font-bold" data-testid={`text-price-${currentIndex}`}>
        ₹{currentPrice.price.toLocaleString()}
      </span>
      <div
        className={cn(
          "flex items-center gap-1 text-xs font-medium",
          isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        )}
      >
        {isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        <span data-testid={`text-change-${currentIndex}`}>
          {isPositive ? "+" : ""}
          {currentPrice.changePercent.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default MarketTicker;
