## 折叠侧边栏的Demo

实现了侧边栏的折叠以及登录的显隐

### 知识点

#### css

元素居中技巧

```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
```

#### js

使用`DOM.classList.remove`来移除样式



实现点击modal主体内容之外的区域也关闭modal使用的是

```js
window.addEventListener('click', (e) => {
    e.target == modal ? modal.classList.remove('show-modal') : false;
})
```

