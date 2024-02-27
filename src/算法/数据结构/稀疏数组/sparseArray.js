// 0表示无效，1表示有限数值
const chessArr1 = Array.from(new Array(11), () => new Array(11).fill(0))
chessArr1[1][2] = 1
chessArr1[2][4] = 2


// 数组转稀疏数组
const  normalToSparse = (arr) => {
  let sum = 0; // 记录有效数个数
  const positionArr = []
  for(let i = 0; i < 11; i++) {
    for(let j = 0; j < 11; j++) {
      if(arr[i][j] !== 0) {
        sum++
        const position = {}
        position.row = i
        position.col = j
        position.val = arr[i][j]
        positionArr.push(position)
      }
    }
  }
  const sparseArr = Array.from(new Array(sum + 1), () => new Array(3).fill(0))
  sparseArr[0][0] = 11
  sparseArr[0][1] = 11
  sparseArr[0][2] = sum

  // 稀疏数组存入有效值的行列位置
  for(let i = 0; i < positionArr.length; i++) {
    sparseArr[i+1][0] = positionArr[i].row
    sparseArr[i+1][1] = positionArr[i].col
    sparseArr[i+1][2] = positionArr[i].val
  }

  return sparseArr
} 

// 稀疏数组转数组
const SparseToNormal = (arr) => {
  // 稀疏数组第一行存储了行列和有效数个数
  const totalCol = arr[0][0]
  const totalRow = arr[0][1]

  const normalArr = Array.from(new Array(totalCol), () => new Array(totalRow).fill(0))

  for(let i = 1; i < arr.length; i++) {
    const col = arr[i][0]
    const row = arr[i][1]
    const val = arr[i][2]

    normalArr[col][row] = val
  }

  return normalArr
}

console.log(SparseToNormal((normalToSparse(chessArr1))))

