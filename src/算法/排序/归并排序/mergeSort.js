export function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  const mid = Math.floor(array.length / 2);

  // 将数组分割为左右两个子数组
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
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

// function mergeSort(arr) {
//   // 如果数组长度小于等于 1，直接返回该数组，因为一个元素的数组是有序的
//   if (arr.length <= 1) {
//     return arr;
//   }

//   const mid = Math.floor(arr.length / 2);
//   // 将数组分割为左右两个子数组
//   const left = arr.slice(0, mid);
//   const right = arr.slice(mid);

//   // 递归地对左右子数组进行归并排序
//   return merge(mergeSort(left), mergeSort(right));
// }

// function merge(left, right) {
//   let result = [];
//   // 左子数组的指针
//   let i = 0;
//   // 右子数组的指针
//   let j = 0;

//   // 当左右子数组都还有元素时进行循环
//   while (i < left.length && j < right.length) {
//     // 如果左子数组当前元素小于右子数组当前元素
//     if (left[i] < right[j]) {
//       // 将左子数组当前元素放入结果数组，并移动左指针
//       result.push(left[i]);
//       i++;
//     } else {
//       // 否则将右子数组当前元素放入结果数组，并移动右指针
//       result.push(right[j]);
//       j++;
//     }
//   }

//   // 如果左子数组还有剩余元素，将其全部放入结果数组
//   return result.concat(left.slice(i)).concat(right.slice(j));
// }

// const a = [9, 3, 7, 2, 8, 5, 1, 4];
// console.log(mergeSort(a));

const a1 = [2, 4, 5, 7];
const a2 = [1, 3, 5, 6];

console.log(merge(a1, a2));
