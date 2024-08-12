/**
 * 带哨兵的双向链表
 * 
 */
class Node {
  constructor(prev,value, next) {
    this.prev = prev; 
    this.value = value;
    this.next = next;
  }
}


class DoubleLinkedListSentry {
  // head
  constructor() {
    this.header = new Node(null, 'header-sentry', null,); 
    this.tail = new Node(null, 'tail-sentry', null);
    this.tail.next = this.header;
    this.header.prev = this.tail;
  } 

  findNode(index) {
    let p = this.header;
    let i = -1;
    while(p !== this.tail) {
      if (i == index) {
        return p;
      }
      p = p.next;
      i++;
    }
  }

  insertList(index, value) {
    const prev = this.findNode(index - 1);
    if (!prev) {
      return false;
    }
    const tail = prev.next;

    const insert = new Node(prev,value,tail);
    prev.next = insert;
    tail.prev = insert;

  }

  removeNode(index) {
    const prev = this.findNode(index - 1);
    if (!prev) {
      return false;
    }
    const removed = prev.next;
    // 不可以移除尾哨兵
    if(removed === this.tail) {
      return false;
    }
    const next = prev.next;
    prev.next = next;
    next.prev = prev;
  }

   addLast(value) {
    const last = 
   }

   removeLast(value) {

   }
}


const doubleLink = new DoubleLinkedListSentry();
doubleLink.insertList(1,1);
