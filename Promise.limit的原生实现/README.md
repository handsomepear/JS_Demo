众所周知js是单线程，并不存在真正的并发，但是由于JavaScript的Event Loop机制，使得异步函数调用有了“并发”这样的假象。这里只是形象说明才这么称呼的，因此用了引号。

有关限制Promise“并发”的文章早就想写了，记性不好老忘记。这个问题是我在2018年某天上班时，一个同事提出来的。

它的使用场景如限制网络请求的数量，限制文件下载请求的上限等等。开发过微信小程序的都知道，网络请求`wx.request`、`wx.downloadFile`等接口的最大并发限制是10。

那么我们如何实现这样的功能，让我们可以随意调用受限制的函数，而又不需要当心它是否超过了限制。

这里依然可以利用到任务队列这种思想，在每次要执行“受限”任务时，判断当前正在执行的任务数量是否超过给定的上限，如果未超过则立即执行这个“任务”，否则进入任务队列中等待执行。

由于我们经常使用Promise作为异步编程的解决方案，这里把异步任务封装成一个Promise或者async函数。



```kotlin
class LimitPromise {
  constructor (max) {
    // 异步任务“并发”上限
    this._max = max
    // 当前正在执行的任务数量
    this._count = 0
    // 等待执行的任务队列
    this._taskQueue = []
  }

  /**
   * 调用器，将异步任务函数和它的参数传入
   * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
   * @param args 异步任务函数的参数列表
   * @returns {Promise<unknown>} 返回一个新的Promise
   */
  call (caller, ...args) {
    return new Promise((resolve, reject) => {
      const task = this._createTask(caller, args, resolve, reject)
      if (this._count >= this._max) {
        // console.log('count >= max, push a task to queue')
        this._taskQueue.push(task)
      } else {
        task()
      }
    })
  }

  /**
   * 创建一个任务
   * @param caller 实际执行的函数
   * @param args 执行函数的参数
   * @param resolve
   * @param reject
   * @returns {Function} 返回一个任务函数
   * @private
   */
  _createTask (caller, args, resolve, reject) {
    return () => {
      // 实际上是在这里调用了异步任务，并将异步任务的返回（resolve和reject）抛给了上层
      caller(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          // 任务队列的消费区，利用Promise的finally方法，在异步任务结束后，取出下一个任务执行
          this._count--
          if (this._taskQueue.length) {
            // console.log('a task run over, pop a task to run')
            let task = this._taskQueue.shift()
            task()
          } else {
            // console.log('task count = ', count)
          }
        })
      this._count++
      // console.log('task run , task count = ', count)
    }
  }
}
```

上述代码内容很少，主要的核心函数也就两个。

- 调用器：就是把真正的执行函数和参数传入，创建返回一个新的Promise，而这个新Promise的什么时候返回，取决于这个异步任务何时被调度。Promise内部主要就是创建一个任务，判断任务是执行还是入队。
- 创建任务：实际上就是返回了一个函数，将真正的执行函数放在里面执行。这里利用了Promise的finally方法，在finally中判断是否执行下一个任务，实现任务队列连续消费的地方就是这里。

下面举个例子怎么使用它。假设我们有一个网络请求模块，叫`request.js`，包含`get`和`post`方法，一般情况下，是这样使用的：



```jsx
const request = require('./request')
request.get('https://www.baidu.com')
  .then((res) => {
    // 处理返回结果
  })
  .catch(err => {
    // 处理异常情况
  })
```

现在我们要把它改造成受限制的网络请求，假设请求上限设为10个，并起名叫`limitRequest.js`。实现如下：



```jsx
const LimitPromise = require('limit-promise')
const request = require('./request')
// 请求上限
const MAX = 10
// 核心控制器
const limitP = new LimitPromise(MAX)

// 利用核心控制器包装request中的函数
function get (url, params) {
  return limitP.call(request.get, url, params)
}
function post (url, params) {
  return limitP.call(request.post, url, params)
}
// 导出
module.exports = {get, post}
```

这里就完成受限请求模块的构建了，是不是很简单，而且调用接口完全没变，只需要引入`limitRequest.js`替代原先的即可。



作者：jialing_lee
链接：https://www.jianshu.com/p/cc706239c7ef
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。