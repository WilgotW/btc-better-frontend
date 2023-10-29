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
        key: authKey,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
