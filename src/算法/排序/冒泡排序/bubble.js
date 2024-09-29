/**
 * 递归实现
 * @param {*} array 待排序数组
 * @param {*} j 已排序边界
 */
export function bubbleSortLoop(array, j) {
  if (j == 0) return;
  let x = 0;
  for (let i = 0; i < j; i++) {
    if (array[i] > array[i + 1]) {
      const temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
      x = i;
    }
  }
  bubbleSortLoop(array, x);
}

/**
 * while实现
 */
export function bubbleSort(array, j) {
  while (j !== 0) {
    let x = 0;
    for (let i = 0; i < j; i++) {
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        x = i;
      }
    }
    j = x;
  }
}

let a = [5, 4, 3, 2, 1];

// bubbleSortLoop(a, a.length - 1);

bubbleSort(a, a.length - 1);

console.log(a);
