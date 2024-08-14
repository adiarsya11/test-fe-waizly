const test_2 = (arr: number[]): void => {
  const n = arr.length;
  let pos = 0, neg = 0, zero = 0;

  arr.forEach(num => {
    if (num > 0) pos++;
    else if (num < 0) neg++;
    else zero++;
  });

  console.log((pos / n).toFixed(6));
  console.log((neg / n).toFixed(6));
  console.log((zero / n).toFixed(6));
}

const arr_2 = [-4, 3, -9, 0, 4, 1];
test_2(arr_2);