/**
 *
 * @param {*} arr 数组
 * @param {*} size 桶容量
 */
function bucketSort(arr, size) {
  let max = arr[0];
  let min = arr[0];

  // 找出数组中最大值和最小值
  for (let item of arr) {
    if (item > max) {
      max = item;
    }
    if (item < min) {
      min = item;
    }
  }

  // 创建桶
  const bucketArr = new Array(Math.floor((max - min) / size) + 1)
    .fill(0)
    .map(() => []);

  // 装桶
  for (let item of arr) {
    const index = Math.floor((item - min) / size);
    bucketArr[index].push(item);
  }

  const result = [];
  // 对每个桶排序
  for (let bucket of bucketArr) {
    insertSort(bucket);
    for (let item of bucket) {
      result.push(item);
    }
  }
  console.log("result---", result);
  return result;
}

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let sorted = i - 1;
    let pending = arr[i];

    while (sorted >= 0 && pending < arr[sorted]) {
      arr[sorted + 1] = arr[sorted];
      sorted--;
    }
    arr[sorted + 1] = pending;
  }
}

const a = [9, 8, 7, 6, 5, 4, 3, 2, 1];
bucketSort(a, 4);
// insertSort(a);
