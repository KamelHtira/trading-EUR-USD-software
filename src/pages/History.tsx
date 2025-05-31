import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // ✅ Import Button
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Activity {
  _id: string;
  pair: string;
  positionSide: "LONG" | "SHORT";
  amount: number;
  price: number;
  total: number;
  profit: number;
  isOpen: boolean;
  createdAt?: string;
}

const History = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/account/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.status === 200 && json.data) {
        setActivities(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch activities:", err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">History & Analytics</h1>

      <Tabs defaultValue="trades">
        <TabsList className="mb-6">
          <TabsTrigger value="trades">Trade History</TabsTrigger>
        </TabsList>

        <TabsContent value="trades">
          <Card className="glass-card">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle>Trade History</CardTitle>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by pair" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All pairs</SelectItem>
                    <SelectItem value="eurusd">EUR/USD</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="7days">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>

                {/* ✅ Refresh Button */}
                <Button variant="outline" onClick={fetchActivities}>
                  Refresh
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Profit</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => {
                    const createdAt = activity.createdAt ? new Date(activity.createdAt) : null;
                    const dateStr = createdAt ? createdAt.toLocaleDateString() : "--";
                    const timeStr = createdAt ? createdAt.toLocaleTimeString() : "--";
                    const isBuy = activity.positionSide === "LONG";

                    return (
                      <TableRow key={activity._id}>
                        <TableCell>
                          <div className="font-medium">{dateStr}</div>
                          <div className="text-xs text-muted-foreground">{timeStr}</div>
                        </TableCell>
                        <TableCell>{activity.pair}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={isBuy ? "border-profit text-profit" : "border-loss text-loss"}
                          >
                            {isBuy ? "buy" : "sell"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${activity.price?.toFixed(3) ?? "--"}</TableCell>
                        <TableCell className="text-right">{activity.amount?.toFixed(3) ?? "--"}</TableCell>
                        <TableCell className="text-right">${activity.total?.toFixed(3) ?? "--"}</TableCell>
                        <TableCell className="text-right">${activity.profit?.toFixed(3) ?? "--"}</TableCell>
                        <TableCell className="text-right">
                          {activity.isOpen ? "Open" : "Closed"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
