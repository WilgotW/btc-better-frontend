import React, { useEffect, useState } from "react";
import LiveGraph from "./LiveGraph";
import GraphPoint from "./GraphPoint";
import randomInt from "../../utils/randomInt";

export default function GraphComponent() {
  const [points, setPoints] = useState<GraphPoint[]>([]);
  const [increased, setIncreased] = useState<boolean>(false);

  useEffect(() => {
    let tempPoints = [];
    for (let i = 0; i < 100; i++) {
      tempPoints.push(new GraphPoint(randomInt(0, 500)));
    }
    setPoints(tempPoints);
  }, []);

  useEffect(() => {
    if (!points || points.length <= 2) return;
    if (
      points[points.length - 1].pointValue <
      points[points.length - 2].pointValue
    ) {
      setIncreased(true);
    }
  }, [points]);

  return (
    <>
      <div className="w-[100%] flex justify-center absolute">
        <div className="flex items-center h-[200px]">
          {increased ? (
            <h1
              className={`text-[4rem] tracking-wider text-outlined-decoration text-[#c54c4c]`}
            >
              $61 632,82
            </h1>
          ) : (
            <h1
              className={`text-[4rem] tracking-wider text-outlined-decoration text-[#6cc54c]`}
            >
              $61 632,82
            </h1>
          )}
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
