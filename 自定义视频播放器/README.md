## 自定义视频播放器

实现自定义的播放器样式

### 知识点

媒体查询：

```css
@media (max-width: 800px) {
 .screen,
 .controls{
  	width: 90%;
 }
}
```

当宽度小于800px时，宽度改为90%。

#### video标签API

`video.play:`使视频播放。

`video.pause:`使视频暂停。

`video.currentTime:`视频播放的当前时间，可以通过修改此值更改视频的播放位置。

`video.duration:`视频的总时间。

`video`标签所有的事件：`pause`，`play`，`timeupdate`事件，分别在视频暂停、播放和时间更新时触发事件处理函数

