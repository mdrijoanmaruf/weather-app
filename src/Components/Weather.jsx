import React, { useEffect, useRef, useState } from 'react';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=c8edec57a66f846121faf7e321d6a30d`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeatherData(null); // Reset weather data on error
        }
    };

    useEffect(() => {
        search("Comilla");
    }, []);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submit behavior
        search(inputRef.current.value);
    };

    return (
        <div className='py-10 px-6 border rounded-3xl flex flex-col items-center mt-20 mx-auto w-full max-w-[400px] sm:mx-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg md:max-w-2xl lg:max-w-3xl'>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className='flex items-center justify-between gap-4 border p-3 rounded-lg w-full max-w-sm bg-white bg-opacity-20 hover:bg-opacity-30 transition-all'>
                <input 
                    type="text" 
                    ref={inputRef} 
                    placeholder='Search city name' 
                    className='bg-transparent border-none outline-none text-white placeholder-gray-200 w-full' 
                />
                <button type="submit">
                    <img src={search_icon} alt="search" className='w-6' />
                </button>
            </form>

            {weatherData ? (
                <>
                    {/* Weather Icon and Temperature */}
                    <img src={weatherData.icon} alt="weather icon" className='w-40 my-8 animate-pulse' />
                    <p className='text-6xl font-extrabold tracking-wide'>{weatherData.temperature}°C</p>
                    <p className='text-2xl font-semibold mt-2'>{weatherData.location}</p>

                    {/* Weather Details */}
                    <div className='flex w-full justify-evenly mt-8 gap-10'>
                        <div className='flex flex-col items-center'>
                            <img src={humidity_icon} alt="humidity" className='w-10 h-10' />
                            <p className='text-xl mt-2'>{weatherData.humidity}%</p>
                            <span className='text-sm text-gray-300'>Humidity</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <img src={wind_icon} alt="wind speed" className='w-10 h-10' />
                            <p className='text-xl mt-2'>{weatherData.windSpeed} Km/h</p>
                            <span className='text-sm text-gray-300'>Wind Speed</span>
                        </div>
                    </div>
                </>
            ) : (
                <p className='mt-6 text-lg'>No weather data available</p>
            )}

            <div className='mt-6 text-sm'>
                <p>Developed by: <a href="https://rijoan.com/" className='underline text-blue-200'>Md Rijoan Maruf</a></p>
            </div>
        </div>
    );
};

export default Weather;
