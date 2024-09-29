export function binarySearchTree() {
  function Node(key) {
    this.left = null;
    this.right = null;
    this.key = key;
  }

  // 根节点
  this.root = null;

  // 插入数据（外部使用）
  binarySearchTree.prototype.insert = function (key) {
    // 根据key创建节点
    const newNode = new Node(key);

    // 判断根节点是否有值
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  };

  binarySearchTree.prototype.put = function(node, key) {
    let parent = null;
    while (node !== null) {
      parent = node;
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        // 更新
        node.key = key;
      }
    }
  
    // 新增
    const newNode = new Node(key);
  
    if (node.key < parent.key) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  };

  // 插入数据（内部使用）
  binarySearchTree.prototype.insertNode = function(node, newNode) {
    // 左侧插入
    if (node.key > newNode.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        // 将左子节点和newNode比较
        this.insertNode(node.left, newNode);
      }
    } else {
      // 右侧插入
      if (node.right === null) {
        node.right = newNode;
      } else {
        // 将右子节点和newNode比较
        this.insertNode(node.right, newNode);
      }
    }
  };

  // 先序遍历（外部使用）
  binarySearchTree.prototype.preOrderTravel = function (handler) {
    this.preOrderTravelOrder(this.root, handler);
  };

  // 先序遍历（内部使用）
  binarySearchTree.prototype.preOrderTravelOrder = function(node, handler) {
    // console.log('handler------', handler);
    if (node !== null) {
      // 处理根节点
      handler(node.key);
       
      // 递归处理左子节点
      this.preOrderTravelOrder(node.left, handler);

      // 递归处理右子节点
      this.preOrderTravelOrder(node.right, handler);
    }
  };

  // 中序遍历-递归实现（外部使用）
  binarySearchTree.prototype.midOrderTravel = function (handler) {
    this.midOrderTravelOrder(this.root, handler);
  };

  // 中序遍历-递归实现（内部使用）
  binarySearchTree.prototype.midOrderTravelOrder = function(node, handler) {
    // console.log('handler------', handler);
    if (node !== null) {
      // 递归处理左子节点
      this.midOrderTravelOrder(node.left, handler);

      // 处理根节点
      handler(node.key);

      // 递归处理右子节点
      this.midOrderTravelOrder(node.right, handler);
    }
  };

  // 中序遍历非递归实现
  binarySearchTree.prototype.midOrderTravalNormal = function(node, handler) {
    const stack = []; // 记录父节点
    while (node !== null || stack.length) {
      // 前进遍历左侧
      if (node !== null) {
        stack.push(node);
        node = node.left;
      } else {
        // 后退到父节点遍历右侧
        const pop = stack.pop();
        // 处理节点
        handler(pop);
        // 遍历右侧
        node = pop.right;
      }
    }
  };

  // 后序遍历（外部使用）
  binarySearchTree.prototype.postOrderTravel = function (handler) {
    this.postOrderTravelOrder(this.root, handler);
  };

  // 后序遍历（内部使用）
  binarySearchTree.prototype.postOrderTravelOrder = function(node, handler) {
    // console.log('handler------', handler);
    if (node !== null) {
      // 递归处理左子节点
      this.postOrderTravelOrder(node.left, handler);

      // 递归处理右子节点
      this.postOrderTravelOrder(node.right, handler);

      // 处理根节点
      handler(node.key);
    }
  };

  // 子树最小值
  binarySearchTree.prototype.subMin = function(node) {
    while(node !== null && node.left !== null) {
      node = node.left;
    }
    return node.key;
  };

  // 某node子树的最大值
  binarySearchTree.prototype.subMax = function(node) {
    while(node !== null && node.right !== null) {
      node = node.right;
    }
    return node.key;
  };

  // 某node子树的最小值
  binarySearchTree.prototype.allMin = function() {
    return binarySearchTree.prototype.subMin(this.root);
  };

  // 最大值
  binarySearchTree.prototype.allMax = function() {
    return binarySearchTree.prototype.subMax(this.root);
  };

  // 查找特定key
  binarySearchTree.prototype.find = function(key) {
    let node = this.root;
    while (node !== null) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;
  };

  /**
   * 托孤方法
   * @param {*} parent 
   * @param {*} deleteNode 
   * @param {*} child 
   */
  binarySearchTree.prototype.shift = function(parent, deleteNode, child) {
    // 根节点情况
    if (parent === null) {
      this.root = child;
    }
    if (parent.left == deleteNode) {
      parent.left = child;
    }
    else if (parent.right == deleteNode) {
      parent.right = child;
    }
  };

  // 删除操作1
  binarySearchTree.prototype.delete = function(key) {
    // 找到被删除的key
    let parent = null;
    let current = this.root;
    
    while(current !== null) {
      if (key < current.key) {
        parent = current;
        current = current.left;
      } else if (key > current.key) {
        parent = current;
        current = current.right;
      } else {
        break;
      }
    }

    if (current === null) {
      return null;
    }

    // 删除操作
    if (current.left === null && current.right !== null) {
      // 情况1
      binarySearchTree.prototype.shift(parent, current, current.right);
    } else if (current.right === null && current.right !== null) {
      // 情况2
      binarySearchTree.prototype.shift(parent, current, current.left);
    } else {
      // 被删除节点有左右节点，找到后继节点托孤，并顶替
      let s = current.right; // 后继节点
      let sParent = current;  // 后继节点父节点
      while(s.left !== null) {
        sParent = s;
        s = s.left;
      }

      // 后继节点和删除节点不相邻，处理后继节点
      if (sParent !== current) {
        binarySearchTree.prototype.shift(sParent, s, s.right);
        s.right = current.right;
      }
      // 后继取代被删除节点
      binarySearchTree.prototype.shift(parent, current, s);
      s.left = current.left;
    }
  };


  // 删除操作2：递归删除
  binarySearchTree.prototype.loopDelete = function(key) {
    this.root = this.loopDeleteFunc(this.root, key);
  };

  /**
   * 
   * @param {*} node 删除的起点
   * @param {*} key 被删除的key值
   * return 被删除节点的孩子
   */
  this.loopDeleteFunc = function(node,key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = this.loopDeleteFunc(node.left,key);
      return node;
    }
    if (key > node.key) {
      node.right = this.loopDeleteFunc(node.right, key);
      return node;
    }
    // 情况1：只有右孩子
    if (node.left === null) {
      return node.right;
    }
    // 情况2：只有左孩子
    if (node.right === null) {
      return node.left;
    }
    // 情况3：有右孩子和左孩子
    // 找到后继节点
    let s = node.right;
    while(s.left) {
      s = s.left;
    }
    s.right = this.loopDeleteFunc(node.right,s.key);
    s.left = node.left;
  };

  // 查找前任：如果有子节点，则为左子树最大值，如果没有子节点，则为自左而来的最近祖宗节点
  binarySearchTree.prototype.predecessor = function(key) {
    let p = this.root;
    // 通过key找到节点和其对应的自左而来的祖宗
    let ancestorFromLeft = null;
    while (p !== null) {
      if (key > p.key) {
        ancestorFromLeft = p;
        p = p.right;
      } else if (key < p.key) {
        p = p.left;
      } else {
        break;
      }
    }
    if (p == null) {
      return null;
    }
    if (p.left) {
      return binarySearchTree.prototype.subMax(p.left);
    }

    return ancestorFromLeft ? ancestorFromLeft.key : null;

  };

  // 查找后任：如果有子节点，则为右子树最小值，如果没有子节点，则为自右而来的最近祖宗节点
  binarySearchTree.prototype.successor = function(key) {
    let p = this.root;
    let ancestorFromRight = null;
    while(p !== null) {
      if (key > p.key) {
        p = p.right;
      } else if (key < p.key) {
        ancestorFromRight = p;
        p = p.left;
      } else {
        break;
      }
    }
    if (p == null) {
      return null;
    }
    if (p.right) {
      return binarySearchTree.prototype.subMin(p.right);
    }

    return ancestorFromRight ? ancestorFromRight.key : null;
  };

  // 范围查找： 中序遍历为升序
  // 找小于key的所有key
  binarySearchTree.prototype.less = function(key) {
    const result = [];
    let p = this.root;
    const stack = [];
    while(p !== null || !!stack.length) {
      if (p !== null) {
        stack.push(p);
        p = p.left;
      } else {
        const pop = stack.pop();
        // 处理值
        if (pop.key < key) {
          result.push(pop.key);
        } else {
          break;
        } 
        p = pop.right;
      }
    }
  };
  // 找大于key的所有value
  binarySearchTree.prototype.greater = function(key) {
    const result = [];
    let p = this.root;
    const stack = [];
    while(p !== null || !!stack.length) {
      if (p !== null) {
        stack.push(p);
        p = p.left;
      } else {
        const pop = stack.pop();
        // 处理值
        if (pop.key > key) {
          result.push(pop.key);
        } 
        p = pop.right;
      }
    }
  };
  // 找到大于等于key1且小于等于key2的所有值
  binarySearchTree.prototype.between = function(key1,key2) {
    const result = [];
    let p = this.root;
    const stack = [];
    while(p !== null || !!stack.length) {
      if (p !== null) {
        stack.push(p);
        p = p.left;
      } else {
        const pop = stack.pop();
        // 处理值
        if (pop.key >= key1 && pop.key <= key2) {
          result.push(pop.key);
        } else if (pop.key > key2) {
          break;
        }
        p = pop.right;
      }
    }
  };


}




const bst = new binarySearchTree();

bst.insert(1);
bst.insert(2);
bst.insert(3);
bst.insert(4);
bst.insert(5);
bst.insert(6);
bst.insert(7);
bst.insert(8);
bst.insert(9);
bst.insert(10);

bst.loopDelete(8);

let resultString = '';
bst.postOrderTravel(function (key) {
  resultString += key + " ";
});
console.log(resultString);

