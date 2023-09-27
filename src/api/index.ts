// import fetchPrice from "./fetchPrice";

import fetchTickerSymbol from "./fetchTickerSymbol";

export default function finnhubApi() {
    // const key = process.env.FINNHUB_KEY;
    const key = "cjs2vcpr01qionifch3gcjs2vcpr01qionifch40";
    const socket = new WebSocket('wss://ws.finnhub.io?token=' + key);


    

     
    console.log()
    fetchTickerSymbol()

    // Connection opened -> Subscribe
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'CAPITAL:GOLD'}))
        console.log("illa")
    });
    
    // Listen for messages
    socket.addEventListener('message', (ev) => {
        const data = JSON.parse(ev.data);
        console.log(data);
        // console.log(data.data[0]);
    });
    // Unsubscribe
    let unsubscribe = function(symbol) {
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    }
}

