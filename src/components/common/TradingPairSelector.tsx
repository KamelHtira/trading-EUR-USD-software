
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TradingPair {
  symbol: string;
  name: string;
}

interface TradingPairSelectorProps {
  onChange?: (pair: TradingPair) => void;
}

const tradingPairs: TradingPair[] = [
  { symbol: "EUR/USD", name: "Selected" }
];

const TradingPairSelector = ({ onChange }: TradingPairSelectorProps) => {
  const [selectedPair, setSelectedPair] = useState<TradingPair>(tradingPairs[0]);

  const handleChange = (value: string) => {
    const pair = tradingPairs.find(p => p.symbol === value) || tradingPairs[0];
    setSelectedPair(pair);
    if (onChange) {
      onChange(pair);
    }
  };

  return (
    <Select value={selectedPair.symbol} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] bg-card border-border">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {tradingPairs.map((pair) => (
          <SelectItem key={pair.symbol} value={pair.symbol}>
            {pair.symbol} - {pair.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TradingPairSelector;
