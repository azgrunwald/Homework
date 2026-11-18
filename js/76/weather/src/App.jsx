import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const key = '3c78799c1b58e714600c1d9e9d1ea8b9'
  const [location, setLocation] = useState('');
  const [icon, setIcon] = useState('')
  const [temp, setTemp] = useState('')
  const [description, setDescription] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=11219&appid=${key}&units=imperial`);

        const weatherData = await r.json();

        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
        }

        console.log(weatherData);

         setLocation(weatherData.name)
         setIcon(`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`)
         setTemp(weatherData.main.temp)
         setDescription(weatherData.weather[0].description)


        // locationElem.innerText = weatherData.name;
        // iconElem.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        // temperatureElem.innerText = weatherData.main.temp;
        // descriptionElem.innerText = weatherData.weather[0].description;

        // weatherElems.forEach(elem => elem.style.display = 'block');
        // noWeatherElems.forEach(elem => elem.style.display = 'none');
      } catch (e) {
        console.error('oops', e);
        // errorElem.innerText = e.message;

        // weatherElems.forEach(elem => elem.style.display = 'none');
        // noWeatherElems.forEach(elem => elem.style.display = 'block');
      }

    }
    fetchData()
  })





  return (
    <>
      <div>The weather in {location}</div>
      <img id='icon' src={icon} />
      <div>{temp} and {description}</div>
    </>
  )
}

export default App
