const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1");


function setTime(number) {
    const setNumber = number < 10 ? `0${number}` : number;
    return setNumber;
}

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds= date.getSeconds();
    clockTitle.innerText = `${setTime(hours)}:${setTime(minutes)}:${setTime(seconds)}`;
}


function init() {
    getTime();
    setInterval(getTime,1000);//1초마다 함수 실행
}

init();