function mirrorKeys(arr) {
  return arr.reduce((prev, curr) => {
    prev[curr] = curr;
  }, {});
}