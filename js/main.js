document.addEventListener('DOMContentLoaded', function () {
    // Slider functionality
    let currentSlide = 0;
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = slides.length;
    let slideInterval;

    function goToSlide(index) {
        if (slider) {
            slider.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }
    }

    function startSlider() {
        slideInterval = setInterval(() => {
            const nextIndex = (currentSlide + 1) % totalSlides;
            goToSlide(nextIndex);
        }, 4000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    if (slider && slides.length > 0 && dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }
        startSlider();
    }

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    }

    // Function to fetch and display weather
    function fetchWeather() {
        // Coordinates for Rohtak, Haryana
        const latitude = 28.90;
        const longitude = 76.61;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.current_weather) {
                    const weather = data.current_weather;
                    const hourly = data.hourly;

                    document.getElementById('weather-temp').textContent = `${Math.round(weather.temperature)}°C`;
                    document.getElementById('weather-wind').textContent = `${weather.windspeed} km/h`;
                    
                    // Find the current hour's data for humidity and feels like temperature
                    const now = new Date();
                    const currentHourISO = now.toISOString().slice(0, 14) + "00";
                    const timeIndex = hourly.time.findIndex(t => t.startsWith(currentHourISO.slice(0,13)));

                    if (timeIndex !== -1) {
                        document.getElementById('weather-humidity').textContent = `${hourly.relativehumidity_2m[timeIndex]}%`;
                        document.getElementById('weather-feels-like').textContent = `${Math.round(hourly.apparent_temperature[timeIndex])}°C`;
                    }
                    
                    document.getElementById('weather-condition').textContent = interpretWeatherCode(weather.weathercode);
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather-condition').textContent = 'Failed to load';
            });
    }

    function interpretWeatherCode(code) {
        const weatherCodes = {
            0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
            45: "Fog", 48: "Depositing rime fog",
            51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
            56: "Light freezing drizzle", 57: "Dense freezing drizzle",
            61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
            66: "Light freezing rain", 67: "Heavy freezing rain",
            71: "Slight snow fall", 73: "Moderate snow fall", 75: "Heavy snow fall",
            77: "Snow grains",
            80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
            85: "Slight snow showers", 86: "Heavy snow showers",
            95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
        };
        return weatherCodes[code] || "Unknown";
    }

    // Fetch weather on page load
    fetchWeather();
    // Refresh weather every 30 minutes (1800000 milliseconds)
    setInterval(fetchWeather, 1800000);
});
