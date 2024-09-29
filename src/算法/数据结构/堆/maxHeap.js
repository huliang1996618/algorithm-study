export function Heap() {
  this.array = [];
  this.size = 0;

  /**
   * 建立大顶堆
   */
  this.MaxHeap = function (array) {
    this.array = array;
    this.size = array.length;
    this.heapify();
  };

  this.heapify = function () {
    // 找到最后一个非叶子节点，从后往前下潜
    // 2x + 1 = size - 1 => x = size / 2 - 1
    const index = Math.floor(this.size / 2 - 1);
    for (let i = index; i >= 0; i--) {
      this.down(i);
    }
  };

  /**
   *获取堆顶元素
   * @returns
   */
  this.peek = function () {
    return this.array[0];
  };

  /**
   * 删除指定索引处元素，并返回
   * @param {*} index
   */
  this.pollIndex = function (index) {
    const deleted = this.array[index];
    this.swap(index, this.size - 1);
    this.array.pop();
    this.size--;
    this.down(index);
    return deleted;
  };

  /**
   * 删除堆顶元素并返回
   * 将堆顶元素和堆底元素交换位置，并删除堆底元素，再将位于顶部的尾元素下潜
   */
  this.poll = function () {
    const top = this.array[0];
    this.swap(0, this.size - 1);
    this.array.pop();
    this.size--;
    this.down(0);
    return top;
  };

  /**
   * 下潜，找到左右子节点，并和最大的子节点交换
   * @param {*} parent
   */
  this.down = function (parent) {
    const left = 2 * parent + 1;
    const right = left + 1;
    let max = parent;

    if (left < this.size && this.array[left] > this.array[max]) {
      max = left;
    }

    if (right < this.size && this.array[right] > this.array[max]) {
      max = right;
    }
    if (max !== parent) {
      this.swap(max, parent);
      this.down(max);
    }
  };

  /**
   * 替换堆顶元素
   * @param {*} replaced
   */
  this.replace = function (replaced) {
    this.array[0] = replaced;
    this.down(0);
  };

  /**
   *
   * @param {*} array 交换数组
   * @param {*} i 交换索引
   * @param {*} j 交换索引
   */
  this.swap = function (i, j) {
    const temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
  };

  /**
   * 堆底添加元素
   * @param {*} offered 上浮元素
   * @returns
   */
  this.offer = function (offered) {
    this.upLoop(offered);
    this.size++;
  };

  /**
   * 上浮元素while写法
   */
  this.up = function (offered) {
    let child = this.size; // 代表offered元素此刻的索引是新加的，且为最底部
    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (offered > this.array[parent]) {
        this.array[child] = this.array[parent];
      } else {
        break;
      }
      child = parent;
    }
    this.array[child] = offered;
  };

  /**
   * 上浮元素递归写法
   */
  this.upLoop = function (offered, child = this.size) {
    if (child === 0) {
      this.array[child] = offered;
      return;
    }
    const parent = Math.floor((child - 1) / 2);
    if (offered > this.array[parent]) {
      this.swap(child, parent);
      return this.upLoop(offered, parent);
    } else {
      this.array[child] = offered;
      return;
    }
  };
}

const a = [7, 5, 6, 4, 2, 1, 3];

const heap = new Heap();
heap.MaxHeap(a);
while (heap.size > 1) {
  heap.swap(0, heap.size - 1);
  heap.size--;
  heap.down(0);
}
console.log(heap.array);
