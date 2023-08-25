import { useRef, useState, useEffect } from "react";
import GraphPoint from "./GraphPoint";

interface IProps {
  currectGraphPoints: GraphPoint[];
}

export default function LiveGraph({ currectGraphPoints }: IProps) {
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
  }, [c]);

  function draw() {
    if (!c) return;

    c.fillStyle = "white";
    c.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  }

  function drawPoints() {
    currectGraphPoints.forEach((point) => {});
  }

  return <canvas width={500} height={300} ref={canvasRef}></canvas>;
}
