// PositionsTable.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Position {
  _id: string;
  pair: string;
  positionSide: "LONG" | "SHORT";
  amount: number;
  price: number;
  isOpen: boolean;
}

const PositionsTable = ({ positions }: { positions: Position[] }) => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Current Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pair</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Entry</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.length > 0 ? (
              positions.map((position) => (
                <TableRow key={position._id}>
                  <TableCell>{position.pair}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        position.positionSide === "LONG"
                          ? "border-profit text-profit"
                          : "border-loss text-loss"
                      }
                    >
                      {position.positionSide.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{position.amount}</TableCell>
                  <TableCell className="text-right">
                    ${position.price}
                  </TableCell>
                  <TableCell className="text-right">
                    {position.isOpen ? "Open" : "Closed"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No positions to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PositionsTable;
