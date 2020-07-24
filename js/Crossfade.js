// A function to do lerping between two math functions, both R -> R
// Receices a weight parameter to give priority to each function
// The weight will be a time between 0 and 1
function mix(functionOne, functionTwo, weight) {
  return (
    functionOne(weight) + (functionTwo(weight) - functionOne(weight)) * weight
  );
}
