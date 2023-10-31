import { useEffect, useState } from "react";
import BetButton from "./ui/BetButton";
import GraphComponent from "./components/GraphComponent";
import BetDurationButton from "./ui/BetDurationButton";
import PlaceBetButton from "./ui/PlaceBetButton";
import DurationInput from "./ui/DurationInput";
import BetsBoard from "./components/BetsBoard";
import finnhubApi from "../../api/finnhub/FinnhubApi";
import fetchEndPrice from "../../api/finnhub/fetchEndPrice";
import hasToken from "../../utils/isLoggedIn";
import getUserData from "../../api/getUserData";
import { TradeDataProps, User } from "../../interfaces";
import getUserBets from "../../api/getUserBets";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tradeData, setTradeData] = useState<TradeDataProps[] | undefined>(
    undefined
  );

  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [duration, setDuration] = useState<string>("1h");
  const [userData, setUserData] = useState<User>();

  const navigate = useNavigate();

  useEffect(() => {
    async function socket() {
      await finnhubApi(setTradeData, tradeData);
    }
    socket();

    // localStorage.removeItem("authorization");

    async function userData() {
      if (hasToken()) {
        const userData = await getUserData();
        if (!userData) {
          navigate("/login");
        }

        setUserData({
          balance: userData.balance,
        });

        const userBets = await getUserBets();
        if (!userBets) {
          console.log("no bets");
        } else {
          console.log(userBets);
        }

        // const data: User = getUserData();
        // setUserData(data);
      } else {
        navigate("/login");
      }
    }
    userData();

    // fetchEndPrice(1697346450, 1697346510);
  }, []);

  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="w-[1500px] h-[100%] bg-main flex-col relative mt-5">
        <GraphComponent tradeData={tradeData} />
        <div className="flex w-[100%]">
          <div className="h-[fit-content] flex flex-col gap-5 p-[50px]">
            <BetButton
              amount={100}
              setSelectedAmount={setSelectedAmount}
              selectedAmount={selectedAmount}
            />
            <BetButton
              amount={1000}
              setSelectedAmount={setSelectedAmount}
              selectedAmount={selectedAmount}
            />
            <BetButton
              amount={10000}
              setSelectedAmount={setSelectedAmount}
              selectedAmount={selectedAmount}
            />
          </div>
          <div className="h-[100%] flex flex-col p-[50px] gap-5">
            <div className="flex justify-left w-[100%] gap-[30px] tracking-wider h-[fit-content]">
              <div className="w-[200px] h-[70px] p-4 rounded-[10px] bg-g1 flex items-center">
                <div className="text-[30px] text-g3 flex justify-between w-[100%]">
                  <div>BET:</div>
                  <div>{selectedAmount}$</div>
                </div>
              </div>
              <div className="w-[300px] h-[70px] p-4 rounded-[10px] bg-g1 flex items-center">
                <h1 className="text-[30px] text-g3">
                  {userData?.balance && `BALANCE: $${userData.balance}`}
                </h1>
              </div>
            </div>
            <div className="flex w-[100%] h-[70px] gap-[30px]">
              <BetDurationButton time={parseInt(duration)} />
              <DurationInput
                inputValue={duration}
                setInputValue={setDuration}
              />
            </div>
            <PlaceBetButton />
          </div>
          <BetsBoard />
        </div>
      </div>
    </div>
  );
}
