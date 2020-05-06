const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");
let ticketPrice = +movieSelect.value;

//渲染本地数据
loadLocalStorage();

// 更新座位数及总票价
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// 保存电影的索引值和票价
function setMovieData(movieIndex){
    localStorage.setItem("selectedMovieIndex", movieIndex);
}

// 获取本地数据并渲染数据
function loadLocalStorage(){
    // 加载本地座位
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }
    // 加载本地选择的电影,更新票价
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = movieSelect.options[selectedMovieIndex].value;
    }
    updateSelectedCount()
}

// 电影下拉框的事件监听
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex)
    updateSelectedCount();
})

// 座位点击事件
container.addEventListener('click', (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
        updateSelectedCount();
    }
})