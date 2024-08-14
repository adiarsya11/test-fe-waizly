const test_1 = (arr: number[]): void => {
    const totalSum = arr.reduce((sum, num) => sum + num, 0);
    const minSum = totalSum - Math.max(...arr); 
    const maxSum = totalSum - Math.min(...arr);

    console.log(minSum, maxSum);
}

const arr_1 = [1, 2, 3, 4, 5];
test_1(arr_1);