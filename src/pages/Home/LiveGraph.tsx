import { useRef, useState, useEffect } from "react";
import GraphPoint from "./GraphPoint";

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
    c.fillStyle = "#2B3E5A";
    c.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    drawPoints();
  }

  function drawPoints() {
    if (!currectGraphPoints || !c) return;

    for (let i = 0; i < currectGraphPoints.length; i++) {
      const spacing = 11;
      c!.strokeStyle = "white";
      const point = currectGraphPoints[i];
      const xPos = i * spacing;
      // c.beginPath();
      // c.arc(xPos, canvasHeight - point.pointValue, 1, 0, 2 * Math.PI);
      // c.closePath();
      // c.stroke();

      c.beginPath();
      c.lineWidth = 3;
      const prevPoint = currectGraphPoints[i - 1];
      if (prevPoint) {
        c.moveTo(xPos, canvasHeight - point.pointValue);
        const nextXpos = (i - 1) * spacing;
        c.lineTo(nextXpos, canvasHeight - prevPoint.pointValue);
        c.closePath();
      }

      c.stroke();
    }
  }

  return (
    <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef}></canvas>
  );
}
