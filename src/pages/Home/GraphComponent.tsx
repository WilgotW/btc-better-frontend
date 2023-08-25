import React, { useEffect, useState } from "react";
import LiveGraph from "./LiveGraph";
import GraphPoint from "./GraphPoint";
import randomInt from "../../utils/randomInt";

export default function GraphComponent() {
  const [points, setPoints] = useState<GraphPoint[]>([]);

  useEffect(() => {
    let tempPoints = [];
    for (let i = 0; i < 120; i++) {
      tempPoints.push(new GraphPoint(randomInt(0, 500)));
    }
    setPoints(tempPoints);
  }, []);

  return (
    <>
      <div className="w-[100%] flex justify-center absolute">
        <div className="flex items-center h-[200px]">
          <h1 className="text-[4rem] tracking-wider text-transparent text-outlined-decoration">
            $61 632,82
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
