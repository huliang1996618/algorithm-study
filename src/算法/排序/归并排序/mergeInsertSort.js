// 归并+插入
export function mergeInsertSort(array) {
  if (array.length < 32) {
    return insertSort(array);
  }

  const mid = Math.floor(array.length / 2);

  // 将数组分割为左右两个子数组
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  return merge(mergeInsertSort(left), mergeInsertSort(right));
}

function merge(left, right) {
  let i = 0; // left数组的索引
  let j = 0; // right数组的索引

  let temp = [];

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      temp.push(left[i]);
      i++;
    } else {
      temp.push(right[j]);
      j++;
    }
  }
  // 如果左子数组还有剩余元素，将其全部放入结果数组
  return temp.concat(left.slice(i)).concat(right.slice(j));
}

function insertSort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    let currentValue = array[i];
    while (j >= 0 && currentValue < array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currentValue;
  }
  return array;
}

const a1 = [2, 4, 5, 7];
const a2 = [1, 3, 5, 6];

console.log(merge(a1, a2));
