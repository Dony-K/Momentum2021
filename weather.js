const weather = document.querySelector(".js-weather")

const COORDS = "coords";
const API_KEY = "886831ea5449e193f118fc3cc47ce66b";
/**api : 다른 서버로부터 쉽게 데이터를 가져올 수 있는 수단. 
 * 컴퓨터끼리 소통하기 위해 고안됨.*/
function getWeather(lat, lng) {
    // fetch : API로 부터 데이터를 받아오는 메소드
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;

        });
        //then 은 앞의 작업이 끝난 뒤 다음 함수가 실행 되도록 한다.
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
        // latitude : latitude, longitude : lognitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError() {
    console.log("can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
    //getCurrentPosition(성공 콜백, 실패 콜백)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    }
    else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init () {
    loadCoords();

}

init ();
