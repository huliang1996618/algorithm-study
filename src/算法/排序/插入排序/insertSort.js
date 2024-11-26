/**
 * 将数组分为两部分[0...low-1][low...a.length - 1]
 * 左边是已排序部分，右边是未排序部分
 * 将未排序的array[low]取出，从右到左找位置插入到左边
 */
export function insertSortLoop(array, low) {
  if (low === array.length) {
    return;
  }
  const insert = array[low]; // 待插入元素
  let i = low - 1;
  while (i >= 0 && insert < array[i]) {
    array[i + 1] = array[i];
    i--;
  }
  array[i + 1] = insert;
  insertSortLoop(array, low + 1);
}

// 非递归
export function insert(array) {
  for (let low = 1; low < array.length; low++) {
    const insert = array[low]; // 待插入元素
    let i = low - 1;
    while (i >= 0 && insert < array[i]) {
      array[i + 1] = array[i];
      i--;
    }
    array[i + 1] = insert;
  }
}

const a = [5, 4, 3, 2, 1];
insert(a, 1);
console.log(a);
