function quickSort(array, left, right) {
  if(left > right) return
  let l = left
  let r = right
  let pivot = array[left] // 设置最左边的为基准

  while(l != r) {
    // 最右侧先动，从右向左扫描比基准小的数
    while(array[r] >= pivot && l < r) {
      r--
    }
    //左侧再动，从左向右扫描比基准大的数
    while(array[l] <= pivot && l < r) {
      l++
    }
    // 交换
    [array[l],array[r]] = [array[r], array[l]]
  }
  // 在相遇处l点，基准和l交换
  array[left] = array[l]
  array[l] = pivot
  quickSort(array, left, l - 1)
  quickSort(array,l + 1, right)
  return
}

const array = [3,4,5,-1,7,3,2,-3]
quickSort(array, 0 , array.length - 1)
console.log(array)