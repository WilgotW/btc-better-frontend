import { useRef, useState, useEffect } from "react";
import GraphPoint from "../GraphPoint";

interface IProps {
  canvasWidth: number;
  canvasHeight: number;
  points: GraphPoint[];
  spacing: number;
  prevPointsAmount: number;
  setPrevPointsAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default function LiveGraph({
  points,
  canvasWidth = 500,
  canvasHeight = 300,
  spacing,
  prevPointsAmount,
  setPrevPointsAmount,
}: IProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [c, setC] = useState<CanvasRenderingContext2D | null>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (context) setC(context);

    draw();
  }, []);

  useEffect(() => {
    // if (points.length > prevPointsAmount) {
    //   //add new point
    // }
    drawNewPoint();
  }, [points]);

  function drawNewPoint() {
    if (!c) return;

    const scalePrice = 5;
    c!.strokeStyle = "#001F3F";
    c.lineWidth = 3;

    c.beginPath();
    c.lineWidth = 3;
    //check if first point
    if (points.length === 1) {
      //first point
      c.arc(0, canvasHeight - points[0].pointValue, 2, 0, Math.PI * 2);
      c.fill();
      c.stroke();
    } else if (points.length > 1) {
      //check if graph is outside boundary
      console.log(points.length * spacing);

      if (points.length * spacing >= 1000) {
        console.log("move");
        c.clearRect(0, 0, canvasWidth, canvasHeight);
        c.fillStyle = "#F5F5F5";
        c.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

        drawPoints(spacing);
        return;
      }

      const prevPoint = points[points.length - 2];
      const newPoint = points[points.length - 1];

      const startX = spacing * (points.length - 2);
      const newX = spacing * (points.length - 1);

      const startY =
        canvasHeight - getLastNumbers(prevPoint.pointValue, 10) * scalePrice;
      const newY =
        canvasHeight - getLastNumbers(newPoint.pointValue, 10) * scalePrice;

      c.moveTo(startX, startY);
      c.lineTo(newX, newY);

      c.closePath();
      c.stroke();
    }
  }

  function getLastNumbers(number: number, amount: number) {
    const newNum = number % amount;
    return newNum;
  }
  // function removeNumbers(number: number, amount: number) {
  //   const stringNum = (number * 100).toString();
  //   if (stringNum.length > amount) {
  //     console.log(stringNum);
  //     const removed = stringNum.substring(amount);
  //     const newNumber = parseInt(removed);
  //     return newNumber;
  //   }
  //   return 0;
  // }

  function draw() {
    if (!c) return;

    c.clearRect(0, 0, canvasWidth, canvasHeight);
    c.fillRect(0, 0, canvasWidth, canvasHeight);
    c.fillStyle = "#F5F5F5";
    c.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    // drawPoints();
  }

  function drawPoints(shiftAmount: number) {
    if (!points || !c || points.length < 3) return;

    // const startIndex = Math.max(0, currentGraphPoints.length - 300);

    // const updated = points.map((point) => (point.pointValue - shiftAmount));

    for (let i = 0; i < points.length; i++) {
      const spacing = 5;
      const scalePrice = 0.01;

      c!.strokeStyle = "#001F3F";
      const point = points[i];
      const prevPoint = points[i - 1];

      const xPos = i * spacing;

      c.beginPath();
      c.lineWidth = 3;
      if (prevPoint) {
        const pointVal: number =
          getLastNumbers(point.pointValue, 10) * scalePrice;
        const prevPointVal: number =
          getLastNumbers(prevPoint.pointValue, 10) * scalePrice;
        c.moveTo(xPos, canvasHeight - pointVal * scalePrice);
        const nextXpos = (i - 1) * spacing;
        c.lineTo(nextXpos, canvasHeight - prevPointVal * scalePrice);
        c.closePath();
      }

      c.stroke();
    }
  }

  return (
    <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef}></canvas>
  );
}
