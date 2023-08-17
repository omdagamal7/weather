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
let allData = [];
contact.addEventListener("click", ()=> {
  home.classList.add("d-none");
  contactUs.classList.remove("d-none");
})
weather.addEventListener("click", ()=> {
  contactUs.classList.add("d-none");
  home.classList.remove("d-none");
})
find.addEventListener("click",()=> {
  display(conSearch.value)
})
let req = new XMLHttpRequest();
function display(searchKey){
  req.open("GET",`https://api.weatherapi.com/v1/forecast.json?key=87695f0dbfb24656a5f215528231408&q=${searchKey}&days=3`);
req.send();
req.addEventListener("readystatechange",()=> {
  if (req.status == 200 && req.readyState == 4){
    let posts = JSON.parse(req.response);
    console.log(posts);
    posts.location.localtime = "2023-08-16 5:52";
    console.log(posts.location.localtime);
    Name.innerHTML = posts.location.name;
    temp.innerHTML = posts.current.temp_c
    if (posts.current.temp_c <= 20){
      img.setAttribute("src","./img/3d-cartoon-weather-icons-set-sun-rain-cloud-lightning-thunderstorm_363543-504.png")
    }else if(posts.current.temp_c > 20 && posts.current.temp_c <= 30) {
      img.setAttribute("src","img/=kk==.png")
    }
  }
})
}
display("alex")