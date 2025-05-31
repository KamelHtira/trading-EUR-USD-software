import { useEffect, useState } from "react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TradingPairSelector from "./TradingPairSelector";

interface ChartProps {
  fullSize?: boolean;
}

interface ApiDataPoint {
  datetime: string;
  close: number;
}

const REFRESH_INTERVAL = 60; // seconds

const Chart = ({ fullSize = false }: ChartProps) => {
  const [chartData, setChartData] = useState<{ time: string; price: number }[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/account/eurusd-data",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (json.status === 200 && json.data?.values) {
          const formatted = json.data.values
            .slice(0, 50) // limit to latest 50 points
            .reverse()
            .map((entry: ApiDataPoint) => ({
              time: new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              price: entry.close,
            }));
          setChartData(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch EUR/USD data", err);
      }
    };

    fetchData();
    setProgress(0);

    timer = setInterval(() => {
      fetchData();
      setProgress(0);
    }, REFRESH_INTERVAL * 1000);

    progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + (100 / REFRESH_INTERVAL) : 100));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <Card className={`glass-card ${fullSize ? "h-full" : ""}`}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <TradingPairSelector />
        <div className="flex gap-2">
         Refreshed every {REFRESH_INTERVAL} seconds
        </div>
      </CardHeader>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <CardContent>
        <div className={`${fullSize ? "h-[calc(100vh-280px)]" : "h-[200px]"}`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={{ stroke: 'hsl(var(--chart-grid))' }}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                orientation="right"
                axisLine={{ stroke: 'hsl(var(--chart-grid))' }}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))'
                }}
                itemStyle={{ color: 'hsl(var(--accent))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--accent))"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
