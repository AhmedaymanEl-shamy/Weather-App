let todayName = document.getElementById('todayName');
let todayDate = document.getElementById('todayDate');
let todayDate2 = document.getElementById('todayDate2');
let todayLocation = document.getElementById('todayLocation');
let todaytemp = document.getElementById('todaytemp');
let todayImg = document.getElementById('todayImg');
let todayTxt = document.getElementById('todayTxt');
let humidtity = document.getElementById('humidtity');
let windspeed = document.getElementById('windspeed');
let windDir = document.getElementById('windDir');


let mdegree = document.getElementsByClassName('mdegree');
let sdegree = document.getElementsByClassName('sdegree');
let nextimg = document.getElementsByClassName('nextimg');
let custom1 = document.getElementsByClassName('custom1');
let nextday= document.getElementsByClassName('nextday');

let search  = document.getElementById('search');















async function getWeatherinfo(cityname){
    let weatherResponce = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0a4973c1f9514736ae343116251907&q=${cityname}&days=3`)
    let weatherData = await weatherResponce.json()
    return weatherData
}

getWeatherinfo();

function displayToday(info){
    let todayDate1 = new Date()
    todayName.innerHTML = todayDate1.toLocaleDateString("en",{weekday:"long"});
    todayDate.innerHTML = todayDate1.toLocaleDateString("en",{month:"long"})
    todayDate2.innerHTML = todayDate1.getDate();
    todayLocation.innerHTML = info.location.name;
    todaytemp.innerHTML = info.current.temp_c+'<sup>o</sup>C';
    todayImg.setAttribute("src",'https:'+info.current.condition.icon);
    console.log(todayImg);
    
    todayTxt.innerHTML = info.current.condition.text;
    humidtity.innerHTML = info.current.humidity+"%";
    windspeed.innerHTML = info.current.wind_kph+"k/h";
    windDir.innerHTML = info.current.wind_dir;
}


function disTomData(info){
let forcatsData = info.forecast.forecastday
for(var i =0 ; i < 2;i++){
        let nextdate = new Date(forcatsData[i+1].date);
        nextday[i].innerHTML = nextdate.toLocaleDateString("en-US",{weekday:"long"}) 
    mdegree[i].innerHTML = forcatsData[i+1].day.maxtemp_c+'<sup>o</sup>C';
    sdegree[i].innerHTML = forcatsData[i+1].day.mintemp_c+'<sup>o</sup>C';
    nextimg[i].setAttribute("src",'https:'+forcatsData[i+1].day.condition.icon);
    custom1[i].innerHTML = forcatsData[i+1].day.condition.text

}

}


async function ready(city){
    let weatherData = await getWeatherinfo(city)
    displayToday(weatherData)
    disTomData(weatherData)
}

ready()

search.addEventListener("input",function(){
    ready(search.value)
})

navigator.geolocation.getCurrentPosition((data)=>{
   let x = data.coords.latitude;
   let y = data.coords.longitude;
   console.log(data);
   ready(`${x},${y}`)
   
},(err)=>{
    console.log(err);
    ready('alex')
})
