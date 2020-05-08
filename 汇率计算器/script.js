// 获取节点
const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rateEl = document.getElementById("rate");

// 通过fetch获取数据并更新DOM
function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const rate = data.rates[currency_two];
            
            rateEl.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

// 事件监听
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_one.addEventListener('focus', () => {
    amountEl_one.value = "";
});
swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();