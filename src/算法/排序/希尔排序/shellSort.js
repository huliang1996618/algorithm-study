function shellSort(array) {
  for (
    let gap = Math.floor(array.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    // [0....pendingIndex - 1][pendingIndex,...array.length - 1]
    for (
      let pendingIndex = gap;
      pendingIndex < array.length;
      pendingIndex += gap
    ) {
      const pending = array[pendingIndex]; // 待插入元素
      let insertedIndex = pendingIndex - gap; // 已排序元素
      while (insertedIndex >= 0 && pending < array[insertedIndex]) {
        array[insertedIndex + gap] = array[insertedIndex];
        insertedIndex -= gap;
      }
      array[insertedIndex + gap] = pending;
    }
  }
}

const array = [5, 4, 3, 2, 1];
shellSort(array);
console.log(array);
