
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class SingleLinkedList {
  header;
  constructor() {
    this.header = null
  }

  addFirst (val) {
    this.header = new Node(val, this.header);
  }
}

const linkedList = new SingleLinkedList()

linkedList.addFirst(1)
linkedList.addFirst(2)
linkedList.addFirst(3)
linkedList.addFirst(4)


