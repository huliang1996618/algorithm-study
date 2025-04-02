// Promise 的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  // 构造函数接收执行器函数
  constructor(executor) {
    this.state = PENDING   // 初始状态
    this.value = null      // 成功值
    this.reason = null     // 失败原因
    this.onFulfilledCallbacks = [] // 成功回调队列
    this.onRejectedCallbacks = []  // 失败回调队列

    // 定义 resolve 函数（需要使用箭头函数绑定this）
    const resolve = (value) => {
      // 状态只能从 pending 改变
      if (this.state !== PENDING) return
      
      // 如果 resolve 的是 Promise，需要递归解析
      if (value instanceof MyPromise) {
        return value.then(resolve, reject)
      }
      
      // 状态变更和值存储
      this.state = FULFILLED
      this.value = value
      
      // 执行所有成功回调（异步）
      this.onFulfilledCallbacks.forEach(fn => fn())
    }

    // 定义 reject 函数
    const reject = (reason) => {
      if (this.state !== PENDING) return
      this.state = REJECTED
      this.reason = reason
      // 执行所有失败回调（异步）
      this.onRejectedCallbacks.forEach(fn => fn())
    }

    // 执行执行器函数，捕获同步错误
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // then 方法实现（核心）
  then(onFulfilled, onRejected) {
    // 值穿透处理：如果参数不是函数，创建默认函数
    onFulfilled = typeof onFulfilled === 'function' 
      ? onFulfilled 
      : value => value
    
    onRejected = typeof onRejected === 'function' 
      ? onRejected 
      : err => { throw err }

    // 创建新 Promise 用于链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      // 统一封装处理函数
      const handleFulfilled = () => {
        // 使用微任务队列保证异步执行
        queueMicrotask(() => {
          try {
            // 执行回调并获取返回值
            const x = onFulfilled(this.value)
            // 关键：处理返回值与 promise2 的关系
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      // 根据当前状态执行不同逻辑
      if (this.state === FULFILLED) {
        handleFulfilled()
      } else if (this.state === REJECTED) {
        handleRejected()
      } else {
        // 如果是 pending 状态，将回调存入队列
        this.onFulfilledCallbacks.push(handleFulfilled)
        this.onRejectedCallbacks.push(handleRejected)
      }
    })

    return promise2
  }

  // catch 语法糖
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // finally 实现
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    )
  }

  /**************** 静态方法 ​****************/
  static resolve(value) {
    // 如果已经是 Promise 实例直接返回
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }

  // 实现 Promise.all
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const result = []
      let count = 0
      
      // 统一处理结果存储
      const processResult = (i, value) => {
        result[i] = value
        // 当所有 Promise 都完成时 resolve
        if (++count === promises.length) resolve(result)
      }

      for (let i = 0; i < promises.length; i++) {
        // 处理非 Promise 值
        MyPromise.resolve(promises[i]).then(
          value => processResult(i, value),
          // 任意一个失败立即 reject
          reject
        )
      }
    })
  }

  // 实现 Promise.race
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (const p of promises) {
        // 只要有一个状态变化就 resolve/reject
        MyPromise.resolve(p).then(resolve, reject)
      }
    })
  }
}

// 核心解析函数（处理不同返回值类型）
function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用检测
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }

  let called = false // 防止多次调用
  
  // 处理 thenable 对象（包含 Promise）
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      const then = x.then
      if (typeof then === 'function') {
        // 如果是 thenable 对象，递归解析
        then.call(
          x,
          y => {
            if (called) return
            called = true
            // 递归解析直到非 thenable 值
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        // 普通对象直接 resolve
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    // 基本类型值直接 resolve
    resolve(x)
  }
}