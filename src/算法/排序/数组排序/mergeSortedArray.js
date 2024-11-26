export function mergeSortedArray(array1, array2) {
  const array3 = [];
  merge(array1, 0, array1.length - 1, array2, 0, array2.length - 1, array3);
  console.log(array3);
}

// 非递归法
function merge(array1, i, iEnd, array2, j, jEnd, array3) {
  let k = 0;
  while (i <= iEnd && j <= jEnd) {
    if (array1[i] < array2[j]) {
      array3[k] = array1[i];
      i++;
    } else {
      array3[k] = array2[j];
      j++;
    }
    k++;
  }
  if (i > iEnd) {
    const rest = array2.slice(j, jEnd + 1);
    array3.push(...rest);
  }

  if (j > jEnd) {
    const rest = array1.slice(i, iEnd + 1);
    array3.push(...rest);
  }
}

// 递归法
export function mergeRecursion(array1, i, iEnd, array2, j, jEnd, array3, k) {
  if (i > iEnd) {
    const rest = array2.slice(j, jEnd + 1);
    array3.push(...rest);
    return array3;
  }

  if (j > jEnd) {
    const rest = array1.slice(i, iEnd + 1);
    array3.push(...rest);
    return array3;
  }
  if (array1[i] < array2[j]) {
    array3[k] = array1[i];
    mergeRecursion(array1, i + 1, iEnd, array2, j, jEnd, array3, k + 1);
  } else {
    array3[k] = array2[j];
    mergeRecursion(array1, i, iEnd, array2, j + 1, jEnd, array3, k + 1);
  }
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4, 5, 7, 9];
mergeSortedArray(array1, array2);
