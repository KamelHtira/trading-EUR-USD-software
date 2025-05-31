
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Mock data
const data = [
  { date: "Mon", profit: 120 },
  { date: "Tue", profit: 180 },
  { date: "Wed", profit: 150 },
  { date: "Thu", profit: 210 },
  { date: "Fri", profit: 190 },
  { date: "Sat", profit: 260 },
  { date: "Sun", profit: 290 },
];

const ProfitLossChart = () => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex justify-between">
          <span>Profit & Loss</span>
          <span className="text-profit">+15.4%</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--profit))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--profit))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                hide={true}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="hsl(var(--profit))"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground mt-4">
          <span>Daily</span>
          <span>Weekly</span>
          <span className="border-b-2 border-primary pb-1 text-foreground">Monthly</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitLossChart;
