export default function isLoggedIn(): boolean {
  if (localStorage.getItem("key")) {
    return true;
  }
  return false;
}
