
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Chart from "@/components/common/Chart";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CircleX, CircleCheck, ArrowUp, ArrowDown } from "lucide-react";

const logItems = [
  { time: "15:45:22", message: "Buy signal detected for BTC/USDT", type: "info" },
  { time: "15:45:23", message: "Placing buy order for 0.1 BTC at $42,980", type: "action" },
  { time: "15:45:25", message: "Order executed successfully", type: "success" },
  { time: "15:30:10", message: "Moving average crossover detected", type: "info" },
  { time: "15:15:45", message: "RSI overbought on 1h timeframe", type: "warning" },
  { time: "15:00:00", message: "Bot check-in - all systems normal", type: "info" },
  { time: "14:55:30", message: "Failed to fetch price data, retrying", type: "error" },
  { time: "14:55:35", message: "Connection re-established", type: "success" },
  { time: "14:45:00", message: "Take profit hit for ETH/USDT position", type: "success" },
  { time: "14:30:22", message: "Analyzing market conditions...", type: "info" },
];

const signals = [
  { pair: "BTC/USDT", direction: "long", strength: "strong", time: "15:45" },
  { pair: "ETH/USDT", direction: "short", strength: "medium", time: "15:30" },
  { pair: "SOL/USDT", direction: "long", strength: "weak", time: "15:15" },
];

const LiveTrading = () => {
  const [activeTab, setActiveTab] = useState("log");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Live Trading</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Chart fullSize />
        </div>
        
        <div className="flex flex-col gap-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Bot Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connection Status:</span>
                  <Badge variant="outline" className="border-profit text-profit">Connected</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trading Mode:</span>
                  <Badge variant="outline" className="border-accent text-accent">Paper Trading</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Strategy:</span>
                  <span className="text-sm">Moving Average Crossover</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Action:</span>
                  <span className="text-sm text-profit">Buy BTC at $42,980</span>
                </div>
                
                <Button variant="destructive" className="w-full mt-2">
                  Emergency Stop
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card flex-1">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Activity</CardTitle>
                <ToggleGroup type="single" value={activeTab} onValueChange={(value) => value && setActiveTab(value)}>
                  <ToggleGroupItem value="log" size="sm">Log</ToggleGroupItem>
                  <ToggleGroupItem value="signals" size="sm">Signals</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeTab === "log" ? (
                <ScrollArea className="h-[320px]">
                  <div className="p-4 space-y-3">
                    {logItems.map((item, index) => (
                      <div key={index} className="text-sm border-l-2 pl-3 py-1 border-muted">
                        <div className="flex justify-between">
                          <span className={`
                            ${item.type === 'error' && 'text-loss'} 
                            ${item.type === 'success' && 'text-profit'}
                            ${item.type === 'warning' && 'text-amber-400'}
                            ${item.type === 'info' && 'text-muted-foreground'}
                            ${item.type === 'action' && 'text-accent'}
                          `}>
                            {item.message}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <ScrollArea className="h-[320px]">
                  <div className="p-4 space-y-4">
                    {signals.map((signal, index) => (
                      <div key={index} className="p-3 border border-border rounded-md bg-card/50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{signal.pair}</span>
                          <Badge variant="outline" className={`${signal.direction === 'long' ? 'border-profit text-profit' : 'border-loss text-loss'}`}>
                            {signal.direction === "long" ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                            {signal.direction}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Signal strength: 
                            <span className={`ml-1 ${
                              signal.strength === 'strong' ? 'text-profit' : 
                              signal.strength === 'medium' ? 'text-amber-400' : 
                              'text-muted-foreground'
                            }`}>
                              {signal.strength}
                            </span>
                          </span>
                          <span className="text-xs text-muted-foreground">{signal.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="glass-card mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Open Positions</CardTitle>
          <CardDescription>Currently active trading positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-md bg-card/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">BTC/USDT</span>
                <Badge variant="outline" className="border-profit text-profit">LONG</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Entry:</span> $42,980
                </div>
                <div>
                  <span className="text-muted-foreground">Current:</span> $43,120
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span> 0.1 BTC
                </div>
                <div>
                  <span className="text-muted-foreground">PnL:</span> <span className="text-profit">+$14.00 (0.32%)</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-md bg-card/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">ETH/USDT</span>
                <Badge variant="outline" className="border-loss text-loss">SHORT</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Entry:</span> $2,540
                </div>
                <div>
                  <span className="text-muted-foreground">Current:</span> $2,560
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span> 1.5 ETH
                </div>
                <div>
                  <span className="text-muted-foreground">PnL:</span> <span className="text-loss">-$30.00 (-0.78%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveTrading;
