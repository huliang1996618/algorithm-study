function shellSort(array) {
  for(let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 从第gap个元素开始使用直接插入法排序
    for(let i = gap; i < array.length; i++) {
      let j = i
      let insertValue = array[j] // 暂存下插入值
      while(j - gap >=0 && insertValue < array[j - gap]) {
        // 元素后移
        array[j] = array[j - gap]
        j-=gap
      }
      // 找到插入位置
      array[j] = insertValue
    }
  }
  console.log(array)
}

const array = [8,5,4,2,3,1]
shellSort(array)

