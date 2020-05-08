// 获取节点
const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");
const nav = document.getElementById("nav")

// 事件监听
toggle.addEventListener('click', () => {
    document.body.classList.toggle("show-nav");
})

open.addEventListener('click', () => {
    modal.classList.add('show-modal')
})

close.addEventListener('click', () => {
    modal.classList.remove('show-modal')
})

window.addEventListener('click', (e) => {
    e.target == modal ? modal.classList.remove('show-modal') : false;
})