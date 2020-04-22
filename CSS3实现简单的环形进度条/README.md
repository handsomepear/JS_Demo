## CSS3实现环形进度条

利用首先创建一个外层容器，然后左右等分这个容器（分别为left和right），将left和right设置为`overflow: hidden`，然后在left和right里创建一个和外层容器一样大小的正方形，设置边界的颜色和`boder-radius:50%`，最后通过animation和rotate来控制动态的效果显示。



需要注意的是，因为要形成连起来的效果，所以左边环形的animation如下：

```css
@keyframes leftAnimation{
    0% {
        transform: rotate(-135deg);
    }
    50% {
        transform: rotate(-135deg);
    }
    100% {
        transform: rotate(45deg);
    }
}
```

前半段时间不动，等待右边的进度条完成。所以leftAnimation的持续时间应该为右边的一倍