// Dashboard.tsx
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BalanceCard from "@/components/dashboard/BalanceCard";
import ProfitLossChart from "@/components/dashboard/ProfitLossChart";
import PositionsTable from "@/components/dashboard/PositionsTable";
import BotControl from "@/components/dashboard/BotControl";
import Chart from "@/components/common/Chart";

export interface Activity {
  _id: string;
  pair: string;
  positionSide: "LONG" | "SHORT";
  amount: number;
  price: number;
  total: number;
  isOpen: boolean;
}

const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  const [openPositions, setOpenPositions] = useState<Activity[]>([]);
  const [allPositions, setAllPositions] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
         const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/account/balance",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (json.status === 200 && json.data) {
          setBalance(json.data.balance);
          setCurrency(json.data.currency);
        }
      } catch (err) {
        console.error("Balance fetch error:", err);
      }
    };

    const fetchPositions = async () => {
      try {
         const token = localStorage.getItem("token");
       
        const [openRes, allRes] = await Promise.all([
          fetch("http://localhost:3000/account/open-positions",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
          fetch("http://localhost:3000/account/activities",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })])

        const openJson = await openRes.json();
        const allJson = await allRes.json();

        if (openJson.status === 200) setOpenPositions(openJson.data);
        if (allJson.status === 200) setAllPositions(allJson.data);
      } catch (err) {
        console.error("Position fetch error:", err);
      }
    };

    fetchBalance();
    fetchPositions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <BalanceCard
          tradingPair="EUR/USD"
          balance={balance ?? 0}
          change={0}
          currency={currency}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Chart />
        </div>
        <div>
          <BotControl />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="positions">
            <TabsList className="mb-4">
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="orders">Open Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="positions">
              <PositionsTable positions={allPositions} />
            </TabsContent>

            <TabsContent value="orders">
              <PositionsTable positions={openPositions} />
            </TabsContent>

          </Tabs>
        </div>

        <div>
          
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
