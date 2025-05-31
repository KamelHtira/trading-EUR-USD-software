
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Market {
  id: string;
  pair: string;
  price: number;
  change: number;
  volume: number;
  signal: 'buy' | 'sell' | 'neutral';
}

const mockMarkets: Market[] = [
  { id: "1", pair: "BTC/USDT", price: 42980.50, change: 3.8, volume: 1256000000, signal: "buy" },
  { id: "2", pair: "ETH/USDT", price: 2540.75, change: -1.2, volume: 856000000, signal: "sell" },
  { id: "3", pair: "SOL/USDT", price: 94.20, change: 5.6, volume: 456000000, signal: "buy" },
  { id: "4", pair: "BNB/USDT", price: 380.50, change: 0.8, volume: 320000000, signal: "neutral" },
  { id: "5", pair: "ADA/USDT", price: 0.58, change: -2.3, volume: 180000000, signal: "sell" },
  { id: "6", pair: "XRP/USDT", price: 0.46, change: 1.4, volume: 210000000, signal: "buy" },
  { id: "7", pair: "DOGE/USDT", price: 0.12, change: -0.5, volume: 150000000, signal: "neutral" },
  { id: "8", pair: "MATIC/USDT", price: 0.84, change: 2.6, volume: 98000000, signal: "buy" },
  { id: "9", pair: "DOT/USDT", price: 7.35, change: -1.1, volume: 78000000, signal: "sell" },
  { id: "10", pair: "SHIB/USDT", price: 0.00001723, change: 4.2, volume: 95000000, signal: "buy" },
];

const Markets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuote, setSelectedQuote] = useState("USDT");

  const filteredMarkets = mockMarkets.filter(market => 
    market.pair.toLowerCase().includes(searchQuery.toLowerCase()) &&
    market.pair.endsWith(selectedQuote)
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Markets</h1>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-lg font-medium">Trading Pairs</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search pairs..." 
                  className="pl-10 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedQuote} onValueChange={setSelectedQuote}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Quote" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">24h Volume</TableHead>
                <TableHead>Signal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map((market) => (
                  <TableRow key={market.id} className="cursor-pointer hover:bg-secondary/30">
                    <TableCell className="font-medium">{market.pair}</TableCell>
                    <TableCell className="text-right">${market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</TableCell>
                    <TableCell className={`text-right ${market.change >= 0 ? "text-profit" : "text-loss"}`}>
                      {market.change >= 0 ? "+" : ""}{market.change}%
                    </TableCell>
                    <TableCell className="text-right">${(market.volume / 1000000).toFixed(1)}M</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          market.signal === "buy" ? "border-profit text-profit" : 
                          market.signal === "sell" ? "border-loss text-loss" : 
                          "border-muted-foreground text-muted-foreground"
                        }
                      >
                        {market.signal}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No trading pairs found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Markets;
