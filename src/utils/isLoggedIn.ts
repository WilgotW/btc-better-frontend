export default function isLoggedIn(): boolean {
  if (localStorage.getItem("authorization")) {
    console.log(localStorage.getItem("authorization"));
    console.log("is logged in");
    return true;
  }
  console.log("not");
  return false;
}
