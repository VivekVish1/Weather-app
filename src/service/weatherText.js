export function getWeatherText(code) {
    if (code === 0) return { label: 'Clear skies', icon: '☀' }
    if ([1, 2].includes(code)) return { label: 'Partly cloudy', icon: '◐' }
    if (code === 3) return { label: 'Overcast', icon: '☁' }
    if ([45, 48].includes(code)) return { label: 'Foggy', icon: '≋' }
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rainy', icon: '☂' }
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snowy', icon: '✦' }
    if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: 'ϟ' }
    return { label: 'Changing skies', icon: '☼' }
}