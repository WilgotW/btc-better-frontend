let header = new Headers();
header.append("x-access-token", "goldapi-gkw8vrlm14zhrd-io");
header.append("Content-Type", "application/json");

let requestOptions = {
  method: "GET",
  headers: header,
};

export default function fetchGoldPrice() {
  try {
    return fetch("https://www.goldapi.io/api/XAU/USD", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result.price_gram_24k;
      })
      .catch((error) => {
        console.log("error", error);
        throw error;
      });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
