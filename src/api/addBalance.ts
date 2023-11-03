import fetchEndPrice from "./finnhub/fetchEndPrice";

export default async function addBalance(betData: any) {
  const authKey = localStorage.getItem("authorization");
  if (!authKey) {
    console.error("no key found");
    return undefined;
  }

  try {
    const newValue = await fetchEndPrice(betData.startdate, betData.enddate);
    console.log("the new value: " + newValue);
    console.log(betData.startdate, betData.enddate);
    const requestBody = {
      newValue: newValue,
    };

    const response = await fetch("http://localhost:4000/bet/add-balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authKey,
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      const updatedUser = await response.json();
      console.log(updatedUser);
    }
  } catch (err) {
    console.error(err);
  }
}
