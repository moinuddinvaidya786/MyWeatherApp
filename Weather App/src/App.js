import React from 'react';
import './App.css';

const api={
  key:"3b2ef890e87c621076cbd92e48b2f7db",
  url:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query,setQuery] = React.useState('');
  const [weather,setWeather] = React.useState('');

  const handleSearch = (e) =>{
    e.preventDefault();
    if(query){
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(resp=>resp.json())
      .then(result=>{setWeather(result);setQuery('');console.log(result)});
    }
  }


  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`
  }

  const setBG = () =>{
    if(typeof weather.main=="undefined") return "app";
    else if(weather.main.temp<=15) return "app cold";
    else if(weather.main.temp>15 && weather.main.temp<=25) return "app lcold";
    else if(weather.main.temp>25 && weather.main.temp<=35) return "app medium";
    else return "app warm";
  }




  return (
    <div className={setBG()}>
      <main>
        <div className="search-bar">
          <input className="search-box" type="text" placeholder="Enter Your City..."
          onChange={(e)=>setQuery(e.target.value)} value={query}>
          </input>
          <button type="submit" className="search-btn" onClick={handleSearch}>
            <img src="https://img.icons8.com/ios-filled/50/000000/search--v2.png" alt=""/>
          </button>
        </div>

        {(typeof weather.main != "undefined")?(
          <div>
            <div className="location-box">
              <h2 className="location">{weather.name}, {weather.sys.country}</h2>
              <p className="date">{dateBuilder(new Date())}</p>
              <div className="temp">{weather.main.temp}°C</div>
              <p className="type">{weather.weather[0].main}</p>
              <div className="other-dets">
                <h4 style={{fontSize: "27px",fontWeight: "100",marginBottom: "30px"}}>Other Details :</h4>
                <p className="others">Current Pressure: {weather.main.pressure} hPa</p>
                <p className="others">Current Humidity: {weather.main.humidity} %</p>
                <p className="others">Current Wind Speed: {weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        ):(
          <div>
            <div className="welcome-box">
              <h2 className="app-name" >Basic My Weather App</h2>
              <p className="comps">
                <div>
                <span>Created On 8th April, 2022</span>
                <br></br>
                <span>By Moinuddin Vaidya</span>
                </div>
              </p>
              <div className="welcome-text">
                <h1>welcome everyone!</h1>
                <br/>
                <p>
                 <span>Check Out Weather Updates For Around 200,000+ Cities Of The World</span>
                </p>
              </div>
            </div>
            
          </div>
        )}
      </main>
    </div>
  )
}

export default App;
