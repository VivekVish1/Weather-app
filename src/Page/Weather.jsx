import '../Styles/weather.css'
import { useState, useEffect } from 'react'
import SearchBar from '../component/searchBar'
import WeatherCard from '../component/weatherCard'
import { getWeather } from '../service/weatherApi'
import { getWeatherText } from '../service/weatherText'

const DEFAULT_CITY = "KOLKATA"

function getGreeting() {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) return <>Good Morning <i className="fa-regular fa-sun"></i></>
    if (hour >= 12 && hour < 16) return <>Good Afternoon <i className="fa-solid fa-sun"></i></>
    if (hour >= 16 && hour < 21) return <>Good Evening <i className="fa-solid fa-cloud-sun"></i></>
    return <>Good Night <i className="fa-solid fa-moon"></i></>
}

function getCurrentTime() {
    return new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
}

function Weather() {

    const [greeting, setGreeting] = useState(getGreeting)
    const [time, setTime] = useState(getCurrentTime)
    const [city, setCity] = useState("")
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    async function loadWeather(cityName) {
        setLoading(true)
        setError("")

        try {
            const data = await getWeather(cityName)
            console.log("Weather Data", data)
            setWeatherData(data)
            setCity(data.location.name);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const request = setTimeout(() => loadWeather(DEFAULT_CITY), 0)
        return () => clearTimeout(request)
    }, [])


    const updateTime = () => {
        setGreeting(getGreeting())
        setTime(getCurrentTime())
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateTime()
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    function handleSearch(e) {
        e.preventDefault()
        const cityToSearch = city || DEFAULT_CITY;
        loadWeather(cityToSearch)
    }

    const forecastDays = weatherData?.weather?.daily?.time?.slice(1) ?? [];

    return (
        <main className='main'>
            <div className='weather-container'>
                <header className='app-header'>
                    <div className='brand-mark'>W</div>
                    <div>
                        <p className='brand-name'>Weatherly</p>
                        <p className='brand-subtitle'>Daily atmosphere</p>
                    </div>

                    {/* <time className='live-clock'>{
                        time.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                        })}
                    </time> */}

                        <p className='live-clock'>{time}</p>

                    <div className='live-status'>
                        <span></span>Live Update
                    </div>
                </header>

                <section className='hero-copy'>
                    {/* <p className='eyebrow'>Current Time : good Night</p> */}
                    <h3 className='eyebrow'>{greeting}</h3>
                    <h1>See what the sky
                        <br />
                        <em>has in store.</em>
                    </h1>
                    <p className='hero-description'>
                        A quieter way to check the weather,
                        wherever your day takes you.
                    </p>
                </section>

                <SearchBar
                    value={city}
                    onChange={setCity}
                    onSearch={handleSearch}
                    loading={loading}
                />

                {error && <div className='error-message'>{error}</div>}
                {loading && !weatherData && (
                    <div className='loading-state'>Reading the sky</div>
                )}

                {weatherData && !loading && (
                    <>
                        <WeatherCard
                            location={weatherData.location}
                            current={weatherData.weather.current}
                            weather={weatherData.weather}
                            today={{
                                temperature_2m_max: weatherData.weather?.daily.temperature_2m_max?.[0],
                                temperature_2m_min: weatherData.weather?.daily.temperature_2m_min?.[0],
                                precipitation_probability_max: weatherData.weather?.daily.precipitation_probability_max?.[0],
                            }}
                        />

                        <section className='forecast-section'>
                            <div className='section-heading'>
                                <h3>Next few days</h3>
                                <span>6 days outlook</span>
                            </div>

                            <div className='forecast-list'>
                                {forecastDays.map((date, index) => {
                                    const i = index + 1

                                    const weatherCode =
                                        weatherData.weather?.daily.weather_code[i]

                                    const { icon } = getWeatherText(weatherCode)

                                    const maxTemp =
                                        weatherData.weather?.daily.temperature_2m_max?.[i]

                                    const minTemp =
                                        weatherData.weather?.daily.temperature_2m_min?.[i]

                                    const dayName = new Intl.DateTimeFormat("en-US", {
                                        weekday: "short",
                                    }).format(new Date(`${date}T12:00:00`))

                                    return (
                                        <div className="forecast-item" key={date}>
                                            <span className="forecast-day">{dayName}</span>
                                            <span className="forecast-icon">{icon}</span>

                                            <span>
                                                <b>{Math.round(maxTemp)}°</b>
                                                <small>{Math.round(minTemp)}°</small>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>

                        <footer>Data by Open-Meteo <span> • </span> Updated just now</footer>
                    </>
                )}
            </div>

        </main >
    )
}

export default Weather