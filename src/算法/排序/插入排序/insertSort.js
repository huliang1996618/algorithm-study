function insertSort(array) {
  //将排序的数组分成有序组和无序组
  //一开始，默认第1个元素是有序的，其他n-1的排序是无序的，待排序
  //当右侧待排序的元素小于左侧有序的元素，则将左侧有序的元素右移挪开位置给待排序的元素
  //直到待排序的元素大于等于某个有序的元素，则插入
  // 整个过程类似于打扑克牌时候，将牌面整理有序一样

  for(let i = 1; i < array.length; i++) {
    let insertValue = array[i] // 待排序的元素
    let insertIndex = i - 1   // 插入位置，即为待排序元素前面一位
    // 当插入位置没有越界并且插入值小于插入位置元素
    while(insertIndex >= 0 && insertValue < array[insertIndex]) {
      // 元素后移
       array[insertIndex + 1] = array[insertIndex]
       insertIndex--
    }
    array[insertIndex + 1] = insertValue
  }
  console.log(array)
}

const array = [69,25,44,31,12,14]
insertSort(array)