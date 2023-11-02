export default async function placeBet(
  userId: number,
  ticker: string,
  duration: number,
  amount: number,
  startValue: number
) {
  const authKey = localStorage.getItem("authorization");
  if (!authKey) {
    console.error("no key found");
    return undefined;
  }
  //   console.log(amount);

  try {
    const requestBody = JSON.stringify({
      userId: userId,
      ticker: ticker,
      duration: duration,
      amount: amount,
      startValue: startValue,
    });
    console.log(requestBody);

    const response = await fetch("http://localhost:4000/bet/create", {
      method: "POST",
      headers: {
        authorization: authKey,
      },
      body: requestBody,
    });

    // const data = await response.json();
    // return data;
  } catch (err) {
    console.error(err);
  }
}
