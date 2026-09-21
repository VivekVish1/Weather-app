import { getWeatherText } from '../service/weatherText'

function WeatherCard({ location, current, today }) {
    const weatherText = getWeatherText(current.weather_code)
    const dateLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date())
    return (
        <section className="weather-card">
            <div className="weather-card__topline">
                <div>
                    <p className="eyebrow">{dateLabel}</p>
                    <h2>{location.name}
                        <span>, {location.country_code}</span>
                    </h2>
                    <p className="muted">{weatherText.label}<span className="dot">•</span>Feels like {Math.round(current.apparent_temperature)}°</p>
                </div>
                <div className="weather-symbol" aria-label={weatherText.label}>{weatherText.icon}</div>
            </div>
            <div className="temperature-row">
                <h1>{Math.round(current.temperature_2m)}
                    <sup>°</sup>
                </h1>
                <div className="temperature-meta">
                    <span>High {Math.round(today.temperature_2m_max)}°</span>
                    <span>Low {Math.round(today.temperature_2m_min)}°</span>
                </div>
            </div>
            <div className="weather-stats">
                <div>
                    <span className="stat-icon">◌</span>
                    <span><b>{current.relative_humidity_2m}%</b><small>Humidity</small></span>
                </div>
                <div>
                    <span className="stat-icon">↗</span>
                    <span><b>{Math.round(current.wind_speed_10m)} km/h</b><small>Wind speed</small></span>
                </div>
                <div>
                    <span className="stat-icon">◒</span>
                    <span><b>{today.precipitation_probability_max}%</b><small>Rain chance</small></span>
                </div>
            </div>
        </section>
    )
}

export default WeatherCard