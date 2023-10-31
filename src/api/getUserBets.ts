import checkStatus from "./checkStatus";

export default async function getUserBets() {
  const authKey = localStorage.getItem("authorization");
  if (!authKey) {
    console.error("no key found");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/bet/get-all", {
      method: "GET",
      headers: {
        authorization: authKey,
      },
    });
    console.log(await response.json());
    if (checkStatus(response.status)) {
      const data = await response.json();
      return data;
    }
    return undefined;
  } catch (err) {
    console.error(err);
  }
}
