import Bet from "./Bet";

interface IProps {
  betData: any;
}

export default function BetsBoard({ betData }: IProps) {
  return (
    <div className="h-[350px] p-[50px]">
      <div className="bg-g1 h-[100%] w-[500px] rounded-[10px] flex flex-col">
        <div className="flex justify-center p-[10px] bg-nvb rounded">
          <h1 className="text-[20px] text-g1 tracking-wide">BETS</h1>
        </div>
        <div className="flex flex-col h-[200px] gap-[1px]">
          {betData?.map((bet: any) => (
            <Bet
              amount={bet.amount}
              startDate={bet.startdate}
              duration={bet.duration}
              profit={bet.profit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
