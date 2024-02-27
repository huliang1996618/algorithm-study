// 使用环形队列
export default class Queue {
  maxSize // 最大容量
  front // 头部
  rear // 队列尾部
  arr
  size // 当前容量

  constructor(arrMaxSize) {
    this.maxSize = arrMaxSize
    // 多出一个位置专门留给尾指针
    this.arr = new Array(arrMaxSize + 1)
    this.rear = 0
    this.front = 0
    this.size = 0
  }

  isEmpty() {
    return this.size === 0
  }

  isFull() {
    return this.size === this.maxSize
  }

  // 入队列
  addQueue(value) {  
    // 判断队列是否满
    if (this.isFull()) {
      console.log('队列已满')
      return
    }
    this.arr[this.rear] = value
    this.rear = (this.rear + 1) % (this.arr.length)
    this.size++
  }

  // 出队列
  getQueue() {
    if(this.isEmpty()) {
      console.log('队列为空')
      return
    }
    const value =  this.arr[this.front]
    this.front = (this.front + 1) % (this.arr.length)
    this.size--
    return value
  }

  // 显示队列
  showQueue() {
    if(this.isEmpty()) {
      console.log('队列为空')
      return
    }
    let p = this.front
    let count = 0
    while(count < this.size) {
      console.log(this.arr[p])
      p = (p + 1) % this.arr.length
      count++
    }
  }
}

const queue = new Queue(3)
queue.addQueue(1)
queue.addQueue(2)
queue.addQueue(2)
queue.getQueue()
queue.showQueue()