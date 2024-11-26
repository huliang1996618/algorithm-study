function countingSort(arr) {
  let max = arr[0];
  let min = arr[0];

  // 找出最小值和最大值
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  // 建立一个容量为max - min + 1的数组
  const countArr = new Array(max - min + 1).fill(0);

  // 统计出现次数
  for (let v of arr) {
    countArr[v - min]++;
  }

  console.log({ countArr });
  console.log({ min });
  console.log({ max });

  let k = 0;

  // countArr[i] 代表出现次数， i + min 代表原始元素
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      a[k++] = i + min;
      countArr[i]--;
    }
  }
}

const a = [5, 4, 4, 3, 2, 1, -1, -2];
countingSort(a);
console.log(a);
