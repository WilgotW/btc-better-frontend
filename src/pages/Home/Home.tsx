import { useEffect, useState } from "react";
import BetButton from "./ui/BetButton";
import GraphComponent from "./components/GraphComponent";
import BetDurationButton from "./ui/BetDurationButton";
import PlaceBetButton from "./ui/PlaceBetButton";
import DurationInput from "./ui/DurationInput";
import BetsBoard from "./components/BetsBoard";
import finnhubApi from "../../api/finnhub/FinnhubApi";
import hasToken from "../../utils/isLoggedIn";
import getUserData from "../../api/getUserData";
import { TradeDataProps, User } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import placeBet from "../../api/placeBet";
import checkBets from "../../api/checkBets";
import fetchEndValue from "../../api/alphavantage/fetchEndValue";
import getUserBets from "../../api/getUserBets";
import { BiRefresh } from "react-icons/bi";

export default function Home() {
  const [tradeData, setTradeData] = useState<TradeDataProps[] | undefined>(
    undefined
  );

  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [duration, setDuration] = useState<string>("1h");
  const [userData, setUserData] = useState<User>();
  const [allBets, setAllBets] = useState();

  const [noFetch, setNoFetch] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setNoFetch(false);
    async function socket() {
      finnhubApi(setTradeData, tradeData);
    }
    socket();
    fetchEndValue();
    if (!userData) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (noFetch === true) {
      navigate("/login");
    }
  }, [noFetch]);

  async function fetchUserData() {
    console.log("called");
    if (hasToken()) {
      try {
        const fetchedData = await getUserData();

        if (fetchedData === undefined) {
          setNoFetch(true);
          return;
        }

        if (fetchedData.id !== undefined && fetchedData.balance !== undefined) {
          setUserData({
            userId: fetchedData.id,
            balance: fetchedData.balance,
          });
          console.log(fetchedData);
        }
      } catch (err) {
        setNoFetch(true);
        console.error(err);
      }

      const userBets = await getUserBets();
      console.log(userBets);
      if (!userBets) {
        console.log("no bets");
      } else {
        console.log(userBets);
        setAllBets(userBets);
      }
    } else {
      setNoFetch(true);
    }
  }

  async function bet(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    ev.preventDefault();

    if (tradeData && userData) {
      const durationNum: number = parseInt(duration.slice(0, -1));

      const bet = await placeBet(
        userData?.userId,
        "BTC",
        durationNum,
        selectedAmount,
        tradeData[tradeData.length - 1].price
      );
      console.log(bet);
      fetchUserData();
    }
  }

  async function getBetsDone(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    ev.preventDefault();
    await checkBets();
    fetchUserData();
  }
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
                {userData?.balance ? (
                  <h1 className="text-[25px] text-g3">
                    BALANCE: ${userData.balance}
                  </h1>
                ) : (
                  <div className="flex w-[100%] items-center justify-left">
                    {" "}
                    <h1 className="text-[25px] text-g3">
                      <div>BALANCE:</div>
                    </h1>
                    <div className="w-[40%] flex justify-center items-center">
                      <div className="loader"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-[100%] h-[70px] gap-[30px]">
              <BetDurationButton time={parseInt(duration)} />
              <DurationInput
                inputValue={duration}
                setInputValue={setDuration}
              />
            </div>
            <div
              onClick={(ev) => bet(ev)}
              className="select-none w-[100%] border rounded-[10px] bg-[#001F3F] h-[70px] flex justify-center items-center cursor-pointer"
            >
              <h1 className="text-white text-[20px] tracking-widest ">
                PLACE BET
              </h1>
            </div>
          </div>
          <div className="relative">
            <BetsBoard betData={allBets} />
            <div className="absolute flex justify-center w-[100%] bottom-7">
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-nvb rounded-full p-1 cursor-pointer">
                <BiRefresh
                  className="w-[100%] h-[100%] "
                  style={{ fill: "white" }}
                  onClick={(ev) => getBetsDone(ev)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
