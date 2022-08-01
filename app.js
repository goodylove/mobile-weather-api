// variable declaration;
const date = document.querySelector(".date");
const myLocation = document.querySelector(".location");
const search = document.querySelector(".search");
let myWeatheIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temp");
const myOvercast = document.querySelector(".overcast");
const windContent = document.querySelector(".content");
const hummidtyContent = document.querySelector(".content-humid");
const rainyContent = document.querySelector(".content-rainy");
const latitude = document.querySelector(".lat");
const long = document.querySelector(".long");
const set = document.querySelector(".set");
const rise = document.querySelector(".rise");
const loader = document.querySelector(".loader");

// function get time and date;
let today = new Date();
let currentDay = today.getDay();
let currentMonth = today.getMonth();
let year = today.getFullYear();
let currentDate = today.getDate();
let myKey = "c103953a288605d521acbc32ace7f35b";

switch (currentDay) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wesnesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
  default:
    break;
}
switch (currentMonth) {
  case 0:
    month = "Jan";
    break;
  case 1:
    month = "Feb";
    break;
  case 2:
    month = "march";
    break;
  case 3:
    month = "Apirl";
    break;
  case 4:
    month = "May";
    break;
  case 5:
    month = "june";
    break;
  case 6:
    month = "July";
    break;
  case 7:
    month = "August";
    break;
  case 8:
    month = "Sept";
    break;
  case 9:
    month = "oct";
    break;
  case 10:
    month = "Nov";
    break;
  case 11:
    month = "Dec";
    break;
  default:
    break;
}
date.textContent = `${day} -${currentDate}- ${month} - ${year}`;
search.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && e.target.value) {
    search.value = e.target.value;
    activateApi();
  }
});

const activateApi = () => {
  const countryName = search.value;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${myKey}`;
  loader.style.display = "block";
  const loadData = async () => {
    const res = await fetch(api);
    const dataInfo = await res.json();
    return dataInfo;
  };
  loadData().then((dataInfo) => {
    loader.style.display = "none";

    console.log(dataInfo);
    //   data restructuring starts here;
    const { coord, main, name, wind, weather, sys } = dataInfo;
    //   ends here
    let rises = sys.sunset / 20000000;
    let sets = sys.sunrise / 200000;
    sets = Math.floor(sets);
    rises = Math.floor(rises);
    let myTemp = main.temp - 273.15;
    myLocation.textContent = `${name}`;
    const myIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    myWeatheIcon.innerHTML = `<img src=${myIcon}>`;
    myTemp = Math.floor(myTemp);
    console.log(myTemp);
    temperature.innerHTML = `${myTemp}&#8451`;
    myOvercast.innerHTML = `${weather[0].description}`;
    windContent.innerHTML = `${wind.speed}mph&#8451`;
    hummidtyContent.innerHTML = `${main.humidity}&#8451`;
    rainyContent.innerHTML = `${main.pressure}&#8451`;
    let myLat = coord.lat;
    let myLong = coord.lon;
    myLong = Math.floor(myLong);
    myLat = Math.floor(myLat);
    latitude.innerHTML = `${myLat}&deg`;
    long.innerHTML = `${myLong}&deg`;
    set.innerHTML = `${sets}&deg`;
    rise.innerHTML = `${rises}&deg`;
  });
};
