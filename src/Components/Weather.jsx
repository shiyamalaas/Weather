import { useState, useEffect } from "react";
import clearsky from "../assets/clearsky.png";
import cloud from "../assets/cloud.png";
import rain from "../assets/rainy.jpeg";
import snow from "../assets/snow.png";
import wind from "../assets/windy.png";
import snowflake from "../assets/snowflake.png";
import thunderstorm from "../assets/Thunderstorm.png";
import mist from "../assets/mist.jpeg";
import sun from "../assets/cloud+sun.png";
import humidity from "../assets/humidity.png";
import windicon from "../assets/wind.png";

function Weather() {
  const weatherIcons = {
    "01d": clearsky,
    "01n": clearsky,
    "02d": sun,
    "02n": sun,
    "03d": cloud,
    "03n": cloud,
    "04d": wind,
    "04n": wind,
    "09d": snow,
    "09n": snow,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snowflake,
    "13n": snowflake,
    "50d": mist,
    "50n": mist,
  };

  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState("");


  const apiKey = import.meta.env.VITE_WEATHER_ID;

  const handleSearch = async (searchCity) => {
    if (!searchCity) {
      alert("Enter the City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        console.error("City not found");
        setWeatherData(false);
        return;
      }

      const icon = weatherIcons[data.weather[0].icon] || clearsky;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
     
      });

      // Clear input after search
      setCity("");

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleSearch("");
  }, []);

  return (
    <div className="min-h-screen bg-violet-300 flex justify-center items-center font-mono p-6 ">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="font-bold text-violet-500 text-3xl">Weather App</h1>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center p-4">
          <input
            placeholder="Enter your location"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-white text-stone-900 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200 w-full sm:w-auto"
          />
          <button
            onClick={() => handleSearch(city)}
            className="text-white bg-violet-500 hover:bg-violet-700 rounded-lg px-4 py-2 shadow-md transition duration-200"
          >
            Get weather
          </button>
        </div>

        {/* Weather Info */}
        {weatherData ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={weatherData.icon}
              alt="weather icon"
              className="w-24 h-24 object-contain bg-transparent"
            />
            <p className="text-violet-500 text-3xl font-semibold">
              {weatherData.temperature}°C
            </p>
            <p className="text-violet-500 text-3xl font-semibold">
              {weatherData.location}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-6 mt-6">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap">
                {/* Humidity */}
                <div className="flex items-center gap-3">
                  <img
                    src={humidity}
                    alt="humidity"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                  <p className="text-violet-500 text-lg sm:text-xl font-semibold">
                    Humidity: {weatherData.humidity}%
                  </p>
                </div>

                {/* Wind */}
                <div className="flex items-center gap-3">
                  <img
                    src={windicon}
                    alt="wind"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                  <p className="text-violet-500 text-lg sm:text-xl font-semibold">
                    Wind: {weatherData.windSpeed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500 mt-4 text-3xl">No data available</p>
        )}
      </div>
    </div>
  );
}

export default Weather;
