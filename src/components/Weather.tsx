'use client';

import { useState } from 'react';

// import rainImage from '../../public/images/rain.png';
// import drizzleImage from '../../public/images/drizzle.png';
// import cloudsImage from '../../public/images/clouds.png';
// import mistImage from '../../public/images/mist.png';
import { WeatherResponse } from '@/interfaces/WeatherResponse';

const API_URL =
  'https://api.openweathermap.org/data/2.5/weather?&appid=5e8b7f3406ffd9d571847b626ba3f339&q=';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  const checkWeather = async (city: string) => {
    const response = await fetch(API_URL + city);
    const data = await response.json();
    setWeatherData(data);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmitWeather = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    checkWeather(city);
  };

  const fahrenheitToCelsius = (fahrenheit: number): number => {
    return Math.round((((fahrenheit - 32) * 5) / 9) * 10) / 10;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-lg shadow-lg text-center w-96">
        <form onSubmit={handleSubmitWeather} className="flex mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleSearchChange}
            className="w-full p-2 rounded-l-lg border-r outline-none"
          />
          <button
            onClick={handleSubmitWeather}
            type="submit"
            className="bg-white p-2 rounded-r-lg hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

        {weatherData && (
          <div>
            {/* <Image
              src={getWeatherImage(weatherData)}
              alt="Weather Icon"
              width={80}
              height={80}
              className="mx-auto mb-4"
            /> */}
            <div className="text-5xl font-bold text-white mb-2">
              {fahrenheitToCelsius(Math.round(weatherData.main.temp))}°C
            </div>
            <div className="text-xl text-white font-medium mb-6">
              {weatherData.name}
            </div>
            <div className="flex justify-between text-white text-sm">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v18m9-9H3"
                  />
                </svg>
                {weatherData.main.humidity}% humidity
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7l6 6m0 0l6-6m-6 6v12"
                  />
                </svg>
                {weatherData.wind.speed} km/h Wind Speed
              </div>
            </div>
          </div>
        )}
        {!weatherData && (
          <div className="text-white mt-4">
            <p className="text-lg">
              Please enter a city name to get the weather information.
            </p>
            <div className="mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 108 0 4 4 0 00-8 0zm0 0v6m8-6a4 4 0 108 0 4 4 0 00-8 0zm0 0v6m8-6a4 4 0 108 0 4 4 0 00-8 0zm0 0v6"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
