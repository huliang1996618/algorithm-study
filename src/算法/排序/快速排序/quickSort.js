function quickSort(array) {
  // 当数组元素为1，为有序的，直接返回
  if (array.length <= 1) {
    return array;
  }
  const pivot = array[0];
  const left = [];
  const right = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  // 如果左指针大于等于右指针，说明子数组长度为 0 或 1，无需排序，直接返回
  if (left >= right) {
    return;
  }
  // 选择左指针指向的元素作为基准值
  let pivot = arr[left];
  // i 指针从左指针开始向右扫描
  let i = left;
  // j 指针从右指针位置开始向左扫描
  let j = right;
  // 当两个指针未相遇时循环
  while (i < j) {
    // 从右向左找小的
    while (i < j && arr[j] > pivot) {
      j--;
    }
    // 从左向右找大的
    while (i < j && arr[i] <= pivot) {
      i++;
    }

    // 交换它们指向的元素
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // 将基准值与 j 指针指向的元素交换，使得基准值处于正确的位置
  [arr[left], arr[j]] = [arr[j], arr[left]];

  // 对基准值左边的子数组递归排序
  quickSortInPlace(arr, left, i - 1);
  // 对基准值右边的子数组递归排序
  quickSortInPlace(arr, i + 1, right);
  // 返回排序后的数组（实际上是在原数组上进行排序，这里的返回主要是为了方便递归调用）
  return arr;
}

const a = [3, 2, 6, 4, 8];

// 3(i),2,6,4,8(j)
// 先从右往左  3(i),2(j),6,4,8
// 再从左往右  3,2(i,j),6,4,8
// 交换 2,3(i,j),6,4,8

// [2], 3, [6,4,8]

// 6(i),4,8(j)  => 4,6,8

console.log(quickSortInPlace(a));
