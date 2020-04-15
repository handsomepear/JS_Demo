## CSS实现对子元素数量不同的不同布局

核心思想就是利用伪类`nth-last-child(1):first-child`找到元素的子元素个数，例如倒数第一个也是第一个元素时，说明只有一个元素。然后利用相邻元素选择器(`~`)设置其他兄弟元素的样式。

```css
/* 倒数第二张图片也是第二张图片，即有两张图片时 */
li:nth-last-child(2):first-child,
/* 第一张图片之后的样式 */
li:nth-last-child(2):first-child ~li{
    width: calc(100% / 2);
    height: calc(100% / 2);
}
```

