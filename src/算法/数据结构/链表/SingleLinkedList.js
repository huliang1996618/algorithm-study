
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class SingleLinkedList {
  header;
  constructor() {
    this.header = null;
  }

  /**
   * 
   * @param {*} val 添加值
   * @description 头部添加 
   */
  addFirst(val) {
    this.header = new Node(val, this.header);
  }


  findLast() {
    if (this.header === null) {
      return null;
    }
    let node = this.header;
    while(node.next) {
      node = node.next;
    }
    return node;
  }

  /**
   * 
   * @param {*} val 待添加值
   * @returns 
   * @description 尾部添加
   */
  addLast(val) {
    const last = this.findLast();
    // 空链表情况
    if (last === null) {
      this.addFirst(val);
      return;
    }
    // 存在last情况
    last.next = new Node(val, null);
  }

  loopAll() {
    let node = this.header;
    while(node) {
      console.log(node.value);
      node = node.next;
    }
  }
}

const linkedList = new SingleLinkedList();

linkedList.addLast(1);
linkedList.addLast(2);
linkedList.addLast(3);
linkedList.addLast(4);

linkedList.loopAll();


