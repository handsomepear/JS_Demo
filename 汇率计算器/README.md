## 汇率转化器

调用exchangerate的API接口获取实时的汇率

### 知识点

#### html

`select`标签的默认选项可以通过在`option`标签中添加`selected`属性来达到。

#### css

使用如下格式定义CSS变量

```css
:root{
    --pramary-color: #5fbaa7;
}
```

用法：

```css
h1{
    color: var(--pramary-color);
}
```

媒体查询

```css
@media (max-width: 600px) {
  .currency input {
    width: 200px;
  }
}
```

#### js

fetch不是AJAX方法，是原生的JS，是一种http请求

```js
fetch("item.json", {
    methods: "POST",
    headers: {
        "Content-Type: application/json"
    }
})
```

第二个参数可以设置请求的方法以及请求头。

`number.toFixed(2)`保留两位小数