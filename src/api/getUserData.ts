import checkStatus from "./checkStatus";

export default async function getUserData() {
  const authKey = localStorage.getItem("authorization");
  if (!authKey) {
    console.error("no key found");
    return;
  }
  try {
    const response = await fetch("http://localhost:4000/user/info", {
      method: "GET",
      headers: {
        authorization: authKey,
      },
    });
    if (checkStatus(response.status)) {
      const data = await response.json();
      return data;
    }
    return undefined;
  } catch (err) {
    console.error(err);
  }
}
