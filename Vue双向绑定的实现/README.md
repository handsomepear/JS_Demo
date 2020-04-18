# Vue双向数据绑定的实现

## 实现原理
利用Proxy代理实现对对象的代理，重写set方法，在对该代理对象就行赋值时，更新绑定该对象属性值的DOM元素。

首先定义两个input标签以及它们的label，还定义一个内容展示区，用于看到input标签内值改变时数据值的变化
```html
<label for="name">姓名：</label>
<input id="name" type="text" oninput="changeValue(this)" onfocus="init(this)" v-model="data.name">
<label for="age">年龄</label>
<input id="age" type="text" oninput="changeValue(this)" onfocus="init(this)" v-model="data.age">
<h3>内容展示</h3>
<p id="text"></p>
```
## 关键代码
对data对象代理
```js
let data = {
   name: "李四",
    age: 12
};
data = new Proxy(data,{
    set(target,property,value){
        target[property] = value;
        let input = document.querySelector(`input[v-model='data.${property}']`)
        input.value = value;
        text.innerHTML = value;
    }
})
```
set方法中target即data对象，property为data的属性（即你要绑定的属性，比如此例中的name,age），value为你设置的值（如设置`data.name = "张三"`, 那么此处的value即为`张三`）
`target[property] = value;`为对该对象进行正常的赋值
`let input = document.querySelector(`input[v-model='data.${property}']`)`通过属性选择器，选择DOM元素中v-model属性值与当前对象属性相等的元素。
`input.value = value;`对选中元素的value进行修改，以达到**数据到视图的更新**
`text.innerHTML = value;`内容展示

那么**视图到数据的更新**怎么办呢？其实也简单，通过监听input的oninput时间就行了，每次输入时，改变代理对象里的值
`oninput="changeValue(this)"`
```js
function changeValue(ele) {
    let modelData = ele.getAttribute("v-model")
    property = modelData.split(".")[1]
    data[property] = ele.value;
}
```
至此，即满足了Vue的双向绑定。

## 完整代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <label for="name">姓名：</label>
    <input id="name" type="text" oninput="changeValue(this)" onfocus="init(this)" v-model="data.name">
    <label for="age">年龄</label>
    <input id="age" type="text" oninput="changeValue(this)" onfocus="init(this)" v-model="data.age">
    <h3>内容展示</h3>
    <p id="text"></p>
    <script>
        let data = {
            name: "李四",
            age: 12
        };
        data = new Proxy(data,{
            set(target,property,value){
                target[property] = value;
                let input = document.querySelector(`input[v-model='data.${property}']`)
                input.value = value;
                text.innerHTML = value;
            }
        })
        function changeValue(ele) {
            let modelDate = ele.getAttribute("v-model")
            property = modelDate.split(".")[1]
            data[property] = ele.value;
        }
        function init(ele){
            let modelData = ele.getAttribute("v-model")
            property = modelData.split(".")[1]
            ele.value = data[property]
        }
    </script>
</body>
</html>
```

