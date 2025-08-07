document.addEventListener('DOMContentLoaded', function () {
    // --- Supabase Client Initialization ---
    const SUPABASE_URL = 'https://jqiifqmiucpqeiytqhkk.supabase.co'; // <-- Replace with your URL
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4'; // <-- Replace with your anon key
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // --- Fetch and Display Mess Menu ---
    async function getMessMenu() {
        const menuList = document.getElementById('mess-menu-list');
        if (!menuList) return; // Don't run if the element doesn't exist

        const today = new Date().getDay(); // Sunday = 0, Monday = 1...
        const dayOfWeek = (today === 0) ? 7 : today; // Adjust to our schema (Sunday = 7)

        const { data, error } = await supabase
            .from('mess_menu')
            .select('*')
            .eq('day_of_week', dayOfWeek);

        if (error) {
            console.error('Error fetching mess menu:', error);
            menuList.innerHTML = '<li>Error loading menu.</li>';
            return;
        }

        if (data && data.length > 0) {
            menuList.innerHTML = ''; // Clear loading text
            data.forEach(item => {
                const menuItem = document.createElement('li');
                menuItem.innerHTML = `<strong>${item.meal_time}</strong><br>${item.food_items}`;
                menuList.appendChild(menuItem);
            });
        } else {
            menuList.innerHTML = '<li>Menu not available for today.</li>';
        }
    }

    // --- Fetch and Display Bulletin ---
    async function getBulletin() {
        const bulletinList = document.getElementById('bulletin-list');
        if (!bulletinList) return; // Don't run if the element doesn't exist

        const { data, error } = await supabase
            .from('bulletin')
            .select('*')
            .order('created_at', { ascending: false }); // Show newest first

        if (error) {
            console.error('Error fetching bulletin:', error);
            bulletinList.innerHTML = '<div class="bulletin-item">Error loading bulletins.</div>';
            return;
        }

        if (data && data.length > 0) {
            bulletinList.innerHTML = ''; // Clear loading text
            data.forEach(item => {
                const bulletinItem = document.createElement('div');
                bulletinItem.className = 'bulletin-item';
                bulletinItem.innerHTML = `<strong>${item.title}</strong><br>${item.content}`;
                bulletinList.appendChild(bulletinItem);
            });
        } else {
            bulletinList.innerHTML = '<div class="bulletin-item">No new announcements.</div>';
        }
    }
    
    // --- Call Supabase functions ---
    getMessMenu();
    getBulletin();

    // --- Existing Slider functionality ---
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

    // --- Existing FAQ functionality ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    }

    // --- Existing Weather functionality ---
    function fetchWeather() {
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

    fetchWeather();
    setInterval(fetchWeather, 1800000);
});
