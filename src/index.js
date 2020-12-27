function formatDate(timestamp) {
    let date=new Date(timestamp);
    let hours=date.getHours();
        if (hours < 10) {
            hours=`0${hours}`;
        }
    let minutes=date.getMinutes();
        if (minutes < 10) {
            minutes=`0${minutes}`;
        }
    let days=["Sunday","Monday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}
function formatHours(timestamp) {
    let date=new Date(timestamp);
    let hours=date.getHours();
    if (hours < 10) {
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if (minutes < 10) {
        minutes=`0${minutes}`;
    }

    return `${hours}:${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");

    temperatureElement.innerHTML=`${Math.round(response.data.main.temp)}°`;

    cityElement.innerHTML=response.data.name;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function displayForecast(response) {
    let forecastElement=document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast=null;

for (let index = 0; index < 3; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML +=`
    <div class="col-sm">
             <ul>
                 <li>
                     ${formatHours(forecast.dt * 1000)}
                 </li>
                 <li>
                 <img src="http://openweathermap.org/img/wn/${
                              forecast.weather[0].icon}@2x.png" />
                </li>
                 <li>
                     <strong>${Math.round(forecast.main.temp_max)}°</strong> / ${Math.round(forecast.main.temp_min)}°C
                 </li>
             </ul>
             </div>
    `;
    }

}

function search (city) { 
let apiKey="ce3605cd0ccb1bd651f8e3fb805629f6";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature)

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  }

  

  function handleSubmit(event) {
      event.preventDefault();
      let cityInputElement=document.querySelector("#city-input");
      search(cityInputElement.value);
  }

  search("Milan");
  let form=document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);