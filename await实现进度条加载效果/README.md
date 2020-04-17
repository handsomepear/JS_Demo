## async和await实现进度条的加载

接口使用jsonplaceholder，实现一个类似游戏的加载条

#### 遇到的问题

在更新width时，只有最后一次设置有效，导致没有中间的加载动画效果

#### 解决办法

原因是ajax请求时使用的是同步请求`xhr.open('GET', url, false)`

将其改成异步请求就可以了