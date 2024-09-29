export function selectionSort(array) {
  for (let right = array.length - 1; right > 0; right--) {
    let max = right;

    for (let i = 0; i < right; i++) {
      if (array[i] > right) {
        max = i;
      }
    }
    if (max !== right) {
      swap(array, max, right);
    }
  }
}

export function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

const a = [5, 4, 3, 2, 1];

selectionSort(a);

console.log(a);
