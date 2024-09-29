

// 节点类
function Entry(hash, key, value) {
  this.hash = hash;
  this.key = key;
  this.value = value;
  this.next = null;
}

// 哈希表
function HashTable() {
  const table = new Array(16);
  this.size = 0; // 元素个数



  this.get = (hash, key) => {
    // 索引位置hash % 数组长度
    console.log(table.length);
    const idx = hash % table.length;
    if (table[idx] === null) {
      return null;
    }
    
    // 遍历链表数据
    let p = table[idx];
    while(p != null) {
      if (p.key === key) {
        return p.value;
      }
      p = p.next;
    }
    return null;
  };

  this.put = (hash,key,value) => {
    const idx = hash % table.length;


    const newEntry = new Entry(hash,key,value);

    if (table[idx] == null) {
      // idx处为空，直接复制
      table[idx] = newEntry;
    } else {
      // idx不为空，沿链表查找，有key，则更新value，没有key则新增
      let p = table[idx];
      while(p) {
        if (p.key === key) {
          p.value = value; // 更新
          return;
        }
        if (p.next == null) {
          break;
        }
        p = p.next;
      }
      p.next = new Entry(hash,key,value);
    }
    this.size++;
  };

  // 根据hash码删除，返回删除的value
  this.remove = (hash,key) => {
    const idx = hash % table.length;
    if (!table[idx]) {
      return null;
    }
    // 找到了则执行单向链表删除
    let p = table[idx];
    let prev = null;
    while(p) {
      if (p.key == key) {
        // prev可能为null,此时删除的是第一个元素，将p.next元素作为第一个元素即可
        if (!prev) {
          table[idx] = p.next;
        } else {
          prev.next = p.next;
        }
        this.size--;
        return p.value;
      }
      prev = p;
      p = p.next;
    }
  };
}

const hashTable = new HashTable();
hashTable.put(1,'zhang','张三');
hashTable.put(17, 'LI','李四');
console.log(hashTable.remove(17,'LI'));
