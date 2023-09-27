import { useRef, useState, useEffect } from "react";
import GraphPoint from "../GraphPoint";

interface IProps {
  canvasWidth: number;
  canvasHeight: number;
  currectGraphPoints: GraphPoint[];
}

export default function LiveGraph({
  currectGraphPoints,
  canvasWidth = 500,
  canvasHeight = 300,
}: IProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [c, setC] = useState<CanvasRenderingContext2D | null>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (context) setC(context);
  }, []);

  useEffect(() => {
    draw();
  }, [currectGraphPoints]);

  function draw() {
    if (!c) return;

    c.clearRect(0, 0, canvasWidth, canvasHeight);
    c.fillStyle = "#F5F5F5";
    c.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    drawPoints();
  }

  function drawPoints() {
    if (!currectGraphPoints || !c) return;

    // const startIndex = Math.max(0, currentGraphPoints.length - 300);

    console.log(currectGraphPoints.length);
    for (let i = 0; i < currectGraphPoints.length; i++) {
      const spacing = 5;
      const scalePrice = 0.01;

      c!.strokeStyle = "#001F3F";
      const point = currectGraphPoints[i];
      const prevPoint = currectGraphPoints[i - 1];

      const xPos = i * spacing;

      c.beginPath();
      c.lineWidth = 3;
      if (prevPoint) {
        const pointVal: number = removeNumbers(point.pointValue, 4);
        const prevPointVal: number = removeNumbers(prevPoint.pointValue, 4);
        c.moveTo(xPos, canvasHeight - pointVal * scalePrice);
        const nextXpos = (i - 1) * spacing;
        c.lineTo(nextXpos, canvasHeight - prevPointVal * scalePrice);
        c.closePath();
      }

      c.stroke();
    }
  }

  function removeNumbers(number: number, amount: number) {
    const stringNum = number.toString();
    if (stringNum.length > 3) {
      const removed = stringNum.substring(amount);
      const newNumber = parseInt(removed);
      return newNumber;
    }
    return 0;
  }

  return (
    <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef}></canvas>
  );
}
