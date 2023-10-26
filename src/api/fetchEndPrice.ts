import React from "react";

interface IProps {
  from: number;
  to: number;
}

export default async function fetchEndPrice(from: number, to: number) {
  const key = "cjs2vcpr01qionifch3gcjs2vcpr01qionifch40";
  const response = await fetch(
    `https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=1&from=${from}&to=${to}&token=${key}`
  );
  const data = await response.json();
  console.log(await data);
}
