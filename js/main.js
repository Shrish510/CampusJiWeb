import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  async function getMessMenu() {
    const menuList = document.getElementById("mess-menu-list");
    if (!menuList) return;

    const today = new Date().getDay();
    const dayOfWeek = today === 0 ? 7 : today;

    const { data, error } = await supabase
      .from("mess_menu")
      .select("*")
      .eq("day_of_week", dayOfWeek);

    if (error) {
      console.error("Error fetching mess menu:", error);
      menuList.innerHTML = "<li>Error loading menu.</li>";
      return;
    }

    if (data && data.length > 0) {
      menuList.innerHTML = "";
      data.forEach((item) => {
        const menuItem = document.createElement("li");
        menuItem.innerHTML = `<strong>${item.meal_time}</strong><br>${item.food_items}`;
        menuList.appendChild(menuItem);
      });
    } else {
      menuList.innerHTML = "<li>Menu not available for today.</li>";
    }
  }

  async function getBulletin() {
    const bulletinList = document.getElementById("bulletin-list");
    if (!bulletinList) return;

    const { data, error } = await supabase
      .from("bulletin")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bulletin:", error);
      bulletinList.innerHTML =
        '<div class="bulletin-item">Error loading bulletins.</div>';
      return;
    }

    if (data && data.length > 0) {
      bulletinList.innerHTML = "";
      data.forEach((item) => {
        const bulletinItem = document.createElement("div");
        bulletinItem.className = "bulletin-item";
        bulletinItem.innerHTML = `<strong>${item.title}</strong><br>${item.content}`;
        bulletinList.appendChild(bulletinItem);
      });
    } else {
      bulletinList.innerHTML =
        '<div class="bulletin-item">No new announcements.</div>';
    }
  }

  getMessMenu();
  getBulletin();
  let currentSlide = 0;
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  const totalSlides = slides.length;
  let slideInterval;

  function goToSlide(index) {
    if (slider) {
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
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
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    const sliderContainer = document.querySelector(".slider-container");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopSlider);
      sliderContainer.addEventListener("mouseleave", startSlider);
    }
    startSlider();
  }

  // --- Existing FAQ functionality ---
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle("active");
      });
    });
  }

  // --- Existing Weather functionality ---
  function fetchWeather() {
    const latitude = 28.9;
    const longitude = 76.61;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.current_weather) {
          const weather = data.current_weather;
          const hourly = data.hourly;

          document.getElementById("weather-temp").textContent = `${Math.round(
            weather.temperature
          )}°C`;
          document.getElementById(
            "weather-wind"
          ).textContent = `${weather.windspeed} km/h`;

          const now = new Date();
          const currentHourISO = now.toISOString().slice(0, 14) + "00";
          const timeIndex = hourly.time.findIndex((t) =>
            t.startsWith(currentHourISO.slice(0, 13))
          );

          if (timeIndex !== -1) {
            document.getElementById(
              "weather-humidity"
            ).textContent = `${hourly.relativehumidity_2m[timeIndex]}%`;
            document.getElementById(
              "weather-feels-like"
            ).textContent = `${Math.round(
              hourly.apparent_temperature[timeIndex]
            )}°C`;
          }

          document.getElementById("weather-condition").textContent =
            interpretWeatherCode(weather.weathercode);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather-condition").textContent =
          "Failed to load";
      });
  }

  function interpretWeatherCode(code) {
    const weatherCodes = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    return weatherCodes[code] || "Unknown";
  }

  fetchWeather();
  setInterval(fetchWeather, 1800000);

  // New code for dynamic calendar
  const calendarGrid = document.getElementById("calendar-grid");
  const currentMonthYearSpan = document.getElementById("currentMonthYear");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // Dummy event data for demonstration
  const dummyEvents = {
      "2025-08-15": ["Independence Day Celebration"],
      "2025-08-20": ["Inter-Batch Volleyball Tournament"],
      "2025-09-05": ["Teachers' Day Event"],
      "2025-09-25": ["Literati Poetry Slam"],
      "2025-10-10": ["Annual Cultural Fest - Riwaayat"],
  };

  function renderCalendar() {
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
      const startDayOfWeek = firstDayOfMonth.getDay();
      const daysInMonth = lastDayOfMonth.getDate();

      currentMonthYearSpan.textContent = firstDayOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      calendarGrid.innerHTML = '';

      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      daysOfWeek.forEach(day => {
          const dayHeader = document.createElement('div');
          dayHeader.classList.add('calendar-day-header');
          dayHeader.textContent = day;
          calendarGrid.appendChild(dayHeader);
      });

      for (let i = 0; i < startDayOfWeek; i++) {
          const emptyDay = document.createElement('div');
          emptyDay.classList.add('calendar-day', 'empty');
          calendarGrid.appendChild(emptyDay);
      }

      for (let day = 1; day <= daysInMonth; day++) {
          const dayElement = document.createElement('div');
          dayElement.classList.add('calendar-day');
          dayElement.textContent = day;

          const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          if (dummyEvents[dateString]) {
              const eventList = document.createElement('ul');
              eventList.classList.add('event-list');
              dummyEvents[dateString].forEach(event => {
                  const eventItem = document.createElement('li');
                  eventItem.textContent = event;
                  eventList.appendChild(eventItem);
              });
              dayElement.appendChild(eventList);
              dayElement.classList.add('has-event');
          }

          calendarGrid.appendChild(dayElement);
      }
  }

  prevMonthBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
      }
      renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
      }
      renderCalendar();
  });

  renderCalendar();
});
