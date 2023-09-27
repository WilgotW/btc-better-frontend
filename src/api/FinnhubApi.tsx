import fetchTickerSymbol from "./fetchTickerSymbol";
import { TradeDataProps } from "../interfaces";

export default function finnhubApi(
  setTradeData: React.Dispatch<
    React.SetStateAction<TradeDataProps[] | undefined>
  >,
  tradeData: TradeDataProps[] | undefined
) {
  //process.env.FINNHUB_KEY ||
  const key = "cjs2vcpr01qionifch3gcjs2vcpr01qionifch40";
  const socket = new WebSocket("wss://ws.finnhub.io?token=" + key);

  // fetchTickerSymbol();
  const subscriptionMessage = JSON.stringify({
    type: "subscribe",
    symbol: "BINANCE:BTCUSDT",
  });

  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.data[0]) {
      const trade = data.data[0];
      const newTrade: TradeDataProps = {
        name: trade.s,
        price: trade.p,
        volume: trade.v,
      };
      setTradeData((prev) => [...(prev ?? []), newTrade]);
    }
  });

  socket.addEventListener("error", (event) => {
    console.error("WebSocket error:", event);
  });

  socket.addEventListener("close", (event) => {
    if (event.code === 1000) {
      console.log("WebSocket connection closed cleanly.");
    } else {
      console.error("WebSocket connection closed with error:", event);
    }
  });

  // Send the subscription message to start receiving trade updates
  socket.addEventListener("open", () => {
    console.log("open");
    socket.send(subscriptionMessage);
  });
}
