## 图片懒加载

关键函数：

```js
function loadImg(imgs){
    for(let i = 0; i < imgs.length; i++){
        if(imgs[i].getBoundingClientRect().top < windowHeight + advanceDistance){
            //imgs[i].getBoundingClientRect().top为获取图片距离浏览器窗口的垂直距离
            imgs[i].src = imgs[i].dataset.src;
        }
    }
}
```

通过监听window的滚动事件，每次当图片距离浏览器顶端的距离小于浏览器视图高度加上提前加载量的时候，将其`data-src`属性的值赋值给`src`以此达到懒加载的目的

因为首屏图片需要直接加载，所以在`onload`方法里也直接调用一次

```js
window.onload = function(e){
    loadImg(imgs);
}
window.onscroll = function(e){
    loadImg(imgs);
}
```



## 完整代码

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        img{
            width: 400px;
            height: 300px;
            position: absolute;
            margin: 50px;
        }
    </style>
</head>
<body>
    <img src="#" alt="图片1" data-src = "./img/1.jpg">
    <img src="#" alt="图片2" data-src = "./img/2.jpg" style="top: 2000px;">
    <script>
        let imgs = document.getElementsByTagName("img");
        let windowHeight = window.innerHeight;
        let advanceDistance = 200;//提前加载量
        window.onload = function(e){
            loadImg(imgs);
        }
        window.onscroll = function(e){
            loadImg(imgs);
        }
        function loadImg(imgs){
            for(let i = 0; i < imgs.length; i++){
                if(imgs[i].getBoundingClientRect().top < windowHeight + advanceDistance){
                    //imgs[i].getBoundingClientRect().top为获取图片距离浏览器窗口的垂直距离
                    imgs[i].src = imgs[i].dataset.src;
                }
            }
        }
    </script>
</body>
</html>
```

