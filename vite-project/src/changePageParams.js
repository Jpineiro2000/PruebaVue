import delete_hash_barra from "./delete_hash.js";

function changePageParams() {
  const currentUrlWindow = window.location.hash;
  console.log("function changePageParams 1 : ", currentUrlWindow);

  let currentUrlWindowHash = delete_hash_barra(currentUrlWindow);

  console.log("function changePageParams 2 : ", currentUrlWindowHash);
  // return currentUrlWindowHash;

  const urlParams = new URLSearchParams(currentUrlWindowHash);
  console.log(urlParams);
  let num_page = urlParams.get("page");
  console.log("Num_page : ", num_page);

  if (num_page === null) {
    return 1;
  } else {
    let num = parseInt(num_page, 10);
    if (isNaN(num)) {
      throw new Error("Error page is NaN");
    } else {
      return num;
    }
  }
}

export default changePageParams;
