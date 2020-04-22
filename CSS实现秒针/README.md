# 实现

采用CSS3的animation动画实现了秒针的旋转（字节跳动面试题）

## 关键代码

```css
.item {
    background: black;
    border-radius: 50%;
    width: 6px;
    height: 200px;
    position: absolute;
    left: 50%;
    margin-left: -3px;
    animation-name: rotateCircle;
    animation-duration: 60s;
    /* 一秒一转 */
    animation-timing-function: steps(60);
    /* 匀速 */
    /* animation-timing-function: linear; */
    /* 无限播放 */
    animation-iteration-count: infinite;
    /* 旋转基点设置为底部居中 */
    transform-origin: center bottom;
}
@keyframes rotateCircle {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
```

分别设置动画名称、动画持续时间、动画播放函数、动画循环、旋转基准点

