
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

/**
 * 带哨兵的单向链表
 * 修改函数如下
 * addLast
 * addFirsts
 * loopAll
 * findNode
 */
class SingleLinkedListWitehSentry {
  header;
  constructor() {
    this.header = new Node(666, null); // Header指向哨兵节点
  }

  /**
   * 
   * @param {*} val 添加值
   * @description 头部添加 
   */
  addFirst(val) {
    this.header.next = new Node(val, this.header.next);
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
    // 有了哨兵节点，last不可能为null了
    last.next = new Node(val, null);
  }

  findNode(index) {
    for(let i = 0, node = this.header.next; node.next !== null; node = node.next, i++) {
      if (i === index) {
        return node;
      }
    }
    return null;
  }

  /**
   * 根据索引获取元素值
   */
  get(index) {
    const node = this.findNode(index);
    if (node === null) {
      return false;
    }
    return node.value;
  }

  /**
   * 在索引位置插入新节点
   */
  insert(index,val) {
    if (index === 0) {
      this.addFirst(val);
      return;
    }
    const prev = this.findNode(index - 1);
    if (!prev) {
      return false;
    }
    prev.next = new Node(val, prev.next);
  }

  /**
   * 移除第一个元素
   */
  removeFirst() {
    if(!this.header) {
      return false;
    }
    this.header = this.header.next;
  }

  /**
   * 根据索引移除元素
   */
  remove(index) {

    if(index === 0) {
      this.removeFirst();
      return;
    }

    const prev = this.findNode(index - 1);

    if(!prev) {
      return false;
    }

    // 被移除的节点
    const removeNode = prev.next;

    if(!removeNode) {
      return false;
    }

    prev.next = removeNode.next;

  }

  /**
   * 遍历打印
   */
  loopAll() {
    let node = this.header.next; // 跳过哨兵
    while(node) {
      console.log(node.value);
      node = node.next;
    }
  }
}

const linkedList = new SingleLinkedListWitehSentry();


linkedList.addLast(1);
linkedList.addLast(1);
linkedList.addLast(1);

linkedList.insert(0,1);


linkedList.loopAll();


