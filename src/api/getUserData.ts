export default async function getUserData() {
  const authKey = localStorage.getItem("key");
  if (!authKey) {
    console.error("no key found");
    return;
  }
  try {
    const response = await fetch("http://localhost:4000/user/info", {
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
