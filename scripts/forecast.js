const temp = document.querySelector('.temp')
const cityName = document.querySelector('.city');
const card = document.querySelector('.card');
const icon = document.querySelector('.icon img');
const form = document.querySelector('form');
const isDay = document.querySelector('.time');
const condition = document.querySelector('.condition');
const localTime = document.querySelector('.local-time');
const key = '3bc958a12c48408d980175227221103';

// get weather async
const getWeather = async(city)=>{
    const base = 'https://api.weatherapi.com/v1/';
    const query = `current.json?key=${key}&q=${city}&aqi=no`;

    const response = await fetch(base + query);
    const data = await response.json();
    console.log(data);
    temp.textContent = data["current"]["temp_c"];
    cityName.textContent = data["location"]["name"];
    condition.textContent = data["current"]["condition"]["text"];
    const imageWeather = "https:"+data["current"]["condition"]["icon"];
    icon.setAttribute('src',imageWeather);
    localTime.textContent = data["location"]["localtime"];

    if(data['current']['is_day']== 1){
        isDay.setAttribute('src',"images/sunny-icon-png-16.jpg");
    }else if(data['current']['is_day']== 0){
        isDay.setAttribute('src',"images/night-icon.png");
    }


}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const country = e.target.children[1].value;
    form.reset();
    getWeather(country);
})

const myLocation =async ()=> {
    const javab = await fetch('https://api.db-ip.com/v2/free/self');
    const javab2 = await javab.json();
    getWeather(javab2["city"]?javab2["city"]:"tehran");
}
myLocation();
