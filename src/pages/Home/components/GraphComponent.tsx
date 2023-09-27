import React, { useEffect, useState } from "react";
import LiveGraph from "./LiveGraph";
import GraphPoint from "../GraphPoint";
import randomInt from "../../../utils/randomInt";
import { TradeDataProps } from "../../../interfaces";

interface IProps {
  currentPrice: number;
  tradeData: TradeDataProps[];
}

export default function GraphComponent({ currentPrice, tradeData }: IProps) {
  const [points, setPoints] = useState<GraphPoint[]>([]);
  const [increased, setIncreased] = useState<boolean>(false);

  useEffect(() => {
    setPoints([...points, new GraphPoint(currentPrice)]);
  }, [currentPrice]);

  useEffect(() => {
    let tempPoints = [];
    for (let i = 0; i < 10; i++) {
      tempPoints.push(new GraphPoint(0));
    }
    setPoints(tempPoints);
  }, []);

  useEffect(() => {
    if (tradeData) {
      addDataPoint(tradeData[tradeData.length - 1].price / 1000);
    }
  }, [tradeData]);

  function addDataPoint(val: number) {
    const newPoint = new GraphPoint(val);
    setPoints((prev) => [...prev, newPoint]);
  }

  useEffect(() => {
    if (!points || points.length <= 2) return;
    if (
      points[points.length - 1].pointValue <=
      points[points.length - 2].pointValue
    ) {
      setIncreased(true);
    } else {
      setIncreased(false);
    }
  }, [points]);

  return (
    <>
      <div className="w-[100%] flex justify-center absolute">
        <div className="flex items-center h-[200px]">
          <h1
            style={{
              color: increased ? "#c54c4c" : "#6cc54c",
            }}
            className="text-[4rem] tracking-wider text-outlined-decoration"
          >
            {tradeData && <>${tradeData[tradeData.length - 1].price}</>}
          </h1>
        </div>
      </div>
      <div className="border-b border-text pb-[100px] flex justify-center underline">
        <LiveGraph
          canvasWidth={1400}
          canvasHeight={500}
          currectGraphPoints={points}
        />
      </div>
    </>
  );
}
