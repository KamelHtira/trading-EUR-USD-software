
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BalanceCardProps {
  tradingPair: string;
  balance: number;
  change: number;
  currency: string;
}

const BalanceCard = ({ tradingPair, balance, change, currency }: BalanceCardProps) => {
  const isPositiveChange = change >= 0;
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{tradingPair}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div className="text-2xl font-bold">{balance.toFixed(2)} {currency}</div>
          <div className={`text-sm ${isPositiveChange ? "text-profit" : "text-loss"}`}>
            {isPositiveChange ? "+" : ""}{change.toFixed(2)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
