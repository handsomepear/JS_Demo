## 电影选票的DEMO

实现了一个电影选票的小DEMO

### 知识点

`nth-of-type()`和`nth-child()`的区别：https://www.cnblogs.com/pssp/p/5991029.html

**CSS3的`appearance`属性**：appearance 属性允许您使元素看上去像标准的用户界												面元素。

使 div 元素看上去像一个按钮：

```css
div
{
appearance:button;
-moz-appearance:button; /* Firefox */
-webkit-appearance:button; /* Safari 和 Chrome */
}
```



**CSS3的`perspective `属性：**perspective 属性定义 3D 元素距视图的距离，以像素计。该属性允许您改变 3D 元素查看 3D 元素的视图。当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身。该Demo中在电影屏幕的显示里用到。

`DOMTokenList`的`toggle`方法：`e.target.classList.toggle("selected")`，当`e.target`有类名`selected`时删除该类，没有时添加该类

`DOMTokenList`的`add`方法：`seat.classList.add("selected")`

使用了`localStorage`实现本地存储

使用`select.options[select.selectedIndex]`获取select标签中选择的元素

