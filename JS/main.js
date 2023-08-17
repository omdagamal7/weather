// https://api.weatherapi.com/v1/forecast.json?key=87695f0dbfb24656a5f215528231408&q=egypt&days=3

let contact = document.querySelector("#contact");
let weather = document.querySelector("#weather");
let home = document.querySelector("#home");
let contactUs = document.querySelector("#contactUs");
let Name = document.querySelector("#name");
let temp = document.querySelector("#temp");
let conSearch = document.querySelector("#conSearch");
let find = document.querySelector("#find");
let img = document.querySelector("#img");
let statu = Array.from(document.querySelectorAll(".statu"));
let statuImg = Array.from(document.querySelectorAll(".statuImg"));
let tempeture = Array.from(document.querySelectorAll(".tempeture"));
let maxTemp = Array.from(document.querySelectorAll(".maxTemp"));
let timeTemp = Array.from(document.querySelectorAll(".timeTemp"))
let allData ;

contact.addEventListener("click", ()=> {
  home.classList.add("d-none");
  contactUs.classList.remove("d-none");
});

weather.addEventListener("click", ()=> {
  contactUs.classList.add("d-none");
  home.classList.remove("d-none");
});

find.addEventListener("click",()=> {
  display(conSearch.value)
});

let req = new XMLHttpRequest();

function display(searchKey){
  req.open("GET",`https://api.weatherapi.com/v1/forecast.json?key=87695f0dbfb24656a5f215528231408&q=${searchKey}&days=7`);
  req.send();
  req.addEventListener("readystatechange",function () {

  if (req.status == 200 && req.readyState == 4){
    let posts = JSON.parse(req.response);
    console.log(posts);
    for (let i = 0; i <posts.forecast.forecastday.length ; i++) {
      
      let {avgtemp_c} = posts.forecast.forecastday[i].day
      let {maxtemp_c} = posts.forecast.forecastday[i].day
      let {text} = posts.forecast.forecastday[i].day.condition
      let {moonrise,moonset,sunrise,sunset} = posts.forecast.forecastday[i].astro
      var time = [sunrise,moonrise,sunset,moonset,]
      if (text == "Patchy rain possible" || text == "Heavy rain" || text == "Moderate rain") {
        text = "Rainy"
      }
      if (text == "Partly cloudy" || text == "" || text == "") {
        text = "Cloudy"
      }
      statu[i].innerHTML = text;
      maxTemp[i].innerHTML = `/${Math.ceil(maxtemp_c)}`;
      tempeture[i].innerHTML = avgtemp_c;

      if (text == "Rainy"){
        statuImg[i].setAttribute("src","img/3d-cartoon-weather-icons-set-sun-rain-cloud-lightning-thunderstorm_363543-504.png");
      }else if(text == "Cloudy") {
        statuImg[i].setAttribute("src","./img/cartoon-clouds-isolated-blue-background-cumulus-fluffy-eddy-blue-sky-hand-drawn-sketch_890748-565.png");
      } else if (text == "Sunny") {
        statuImg[i].setAttribute("src","./img/vector-modern-flat-sun-sunshine-icon-yellow-gradient-sunhot-weather-icon_491392-71.png")
      }

    }
    for (let i = 0; i < timeTemp.length ; i++) {
      timeTemp[i].innerHTML = time[i];
    }
    Name.innerHTML = posts.location.name;
    temp.innerHTML = posts.current.temp_c
    if (posts.current.temp_c <= 20){
      img.setAttribute("src","./img/3d-cartoon-weather-icons-set-sun-rain-cloud-lightning-thunderstorm_363543-504.png");
    }else if(posts.current.temp_c > 20 && posts.current.temp_c <= 30) {
      img.setAttribute("src","img/=kk==.png");
    }
  }

});
}
display("alex")

