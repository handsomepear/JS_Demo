//获取节点
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerHTML = message;
}
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}
function checkRequire(inputArr){
    inputArr.forEach((input) => {
        if(input.value.trim() === ""){
            showError(input, `${getKeywords(input)}为必填项`)
        }else{
            showSuccess(input)
        }
    })
}
function getKeywords(input){
    return input.placeholder.slice(3);
}
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getKeywords(input)}最少需要${min}个字符`)
    }else if(input.value.length > max){
        showError(input, `${getKeywords(input)}最多只能${max}个字符`)
    }else{
        showSuccess(input)
    }
}
function checkEmail(email){
    const rep = /^([a-zA-z0-9_\-\.])+\@([a-zA-z0-9_\-\.])+\.([a-zA-Z]{2,4})$/;
    if(rep.test(email.value.trim())){
        showSuccess(email);
    }else{
        showError(email, "邮箱格式错误")
    }
}
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2,"密码不匹配")
    }
}
//点击按钮时进行表单验证
// form.addEventListener("submit", function(e){
//     e.preventDefault();
//     checkRequire([username,email,password,password2]);
//     checkLength(username, 3, 15);
//     checkLength(password, 6, 15);
//     checkEmail(email);
//     checkPasswordsMatch(password, password2);
// })


//使用防抖进行表单验证
let usernameTimer;
let emailTimer;
let passwordTimer;
let password2Timer;

username.oninput = function(){
    if(usernameTimer){
        clearTimeout(usernameTimer)
    }
    usernameTimer = setTimeout(function(){
        checkRequire([username]);
        checkLength(username, 3, 15);
    },1000)
}
email.oninput = function(){
    if(emailTimer){
        clearTimeout(emailTimer)
    }
    emailTimer = setTimeout(function(){
        checkRequire([email]);
        checkEmail(email);
    },1000)
}
password.oninput = function(){
    if(passwordTimer){
        clearTimeout(passwordTimer)
    }
    passwordTimer = setTimeout(function(){
        checkRequire([password]);
        checkLength(password, 6, 15);
    },1000)
}
password2.oninput = function(){
    if(password2Timer){
        clearTimeout(password2Timer)
    }
    password2Timer = setTimeout(function(){
        checkRequire([password2]);
        checkPasswordsMatch(password, password2);
    },1000)
}
