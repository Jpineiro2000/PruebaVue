function delete_hash_barra(string) {
  let arr = [];
  for (let i of string) {
    if (i !== "#" && i !== "/") arr.push(i);
  }
  console.log("el join", arr.join(""));
  return arr.join("");
}

export default delete_hash_barra;
