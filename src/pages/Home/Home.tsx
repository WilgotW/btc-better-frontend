import { useState } from "react";
import BetButton from "./ui/BetButton";
import GraphComponent from "./components/GraphComponent";
import BetDurationButton from "./ui/BetDurationButton";
import PlaceBetButton from "./ui/PlaceBetButton";
import DurationInput from "./ui/DurationInput";
import BetsBoard from "./components/BetsBoard";

let header = new Headers();
header.append("x-access-token", "goldapi-gkw8vrlm14zhrd-io");
header.append("Content-Type", "application/json");

let requestOptions = {
  method: "GET",
  headers: header,
  redirect: "follow",
};

export default function Home() {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [duration, setDuration] = useState<string>("1h");

  const [currentPrice, setCurrentPrice] = useState<number>(0);

  async function getPrice() {
    try {
      fetch("https://www.goldapi.io/api/XAU/USD", requestOptions)
        .then((response) => response.json())
        .then((result) => setCurrentPrice(result.price_gram_24k))
        .catch((error) => console.log("error", error));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="w-[1500px] h-[100%] bg-main flex-col relative mt-5">
        <GraphComponent currentPrice={currentPrice} />
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
                <h1 className="text-[30px] text-g3">BALANCE: 10.000$</h1>
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
          <button onClick={getPrice}>get price</button>
        </div>
      </div>
    </div>
  );
}
