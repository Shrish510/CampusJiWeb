// src/pages/Home/index.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { supabase } from '../../utils/supabaseClient';
import '../../styles/style.css'; // Main page styles

const Home = () => {
  const [sliderData, setSliderData] = useState([]);
  const [lostFoundData, setLostFoundData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Slider Data
      const { data: slider, error: sliderError } = await supabase
        .from('slider')
        .select('*');
      if (sliderError) {
        console.warn("Error fetching slider data:", sliderError.message);
        // Fallback dummy data if DB is empty or fails
        setSliderData([
            { id: 1, image_url: '/images/slider1.jpg', title: 'Welcome to CampusJi', description: 'Your campus companion' },
             // Add more dummy slides if needed for testing
        ]);
      } else if (slider) {
        setSliderData(slider);
      }

      // 2. Fetch Lost & Found Data
      const { data: lostFound, error: lfError } = await supabase
        .from('lost_found')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (lfError) {
          console.warn("Error fetching lost & found:", lfError.message);
      } else {
          setLostFoundData(lostFound || []);
      }

      // 3. Fetch Events (Calendar)
      // Assuming 'events' table
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString()) // Upcoming events
        .order('date', { ascending: true })
        .limit(5);

      if (eventsError) {
          console.warn("Error fetching events:", eventsError.message);
      } else {
          setEventsData(events || []);
      }

      // 4. Fetch Weather (or mock)
      // Since weather is dynamic/real-time, checking if there is a 'weather_updates' table or similar.
      // If not, we might want to use a mock or fetch from a public API if we had keys.
      // For now, I'll set a static state or fetch from a simple 'weather' table if it exists.
      const { data: weather, error: weatherError } = await supabase
          .from('weather')
          .select('*')
          .limit(1)
          .single();

      if (weatherError || !weather) {
          // Mock weather if fetch fails
          setWeatherData({
              temp: '28°C',
              condition: 'Sunny',
              location: 'Rohtak',
              humidity: '45%',
              wind: '10 km/h'
          });
      } else {
          setWeatherData(weather);
      }
    };

    fetchData();
  }, []);

  // Slider Auto-play
  useEffect(() => {
    if (sliderData.length > 1) {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 5000);
        return () => clearInterval(interval);
    }
  }, [sliderData]);

  const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content home-content">

        {/* Slider Section */}
        {sliderData.length > 0 && (
            <section className="slider-container">
                <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {sliderData.map((slide, index) => (
                        <div className="slide" key={slide.id || index}>
                            {/* Use a placeholder if image_url is missing or relative */}
                            <img src={slide.image_url || '/images/placeholder.jpg'} alt={slide.title}
                                 onError={(e) => {e.target.src = '/images/placeholder.jpg'}} />
                            <div className="slide-overlay">
                                <h2 className="slide-title">{slide.title}</h2>
                                <p className="slide-description">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="slider-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
                <button className="slider-arrow right-arrow" onClick={nextSlide}>&#10095;</button>

                <div className="slider-nav">
                    {sliderData.map((_, index) => (
                        <div
                            key={index}
                            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        ></div>
                    ))}
                </div>
            </section>
        )}

        {/* 3-Column Section: Weather, Calendar, Lost & Found */}
        <section className="three-column-section">

            {/* Weather & Calendar (Grouped visually in CSS usually, but let's follow the grid) */}
            <div className="weather-calendar-container">
                {/* Weather Card */}
                <div className="column-card weather-card">
                    <h3>Weather Update</h3>
                    {weatherData ? (
                        <div className="weather-info">
                            <div className="weather-location">{weatherData.location}</div>
                            <div className="weather-temp">{weatherData.temp}</div>
                            <div className="weather-condition">{weatherData.condition}</div>
                            <div className="weather-details">
                                <div className="weather-detail">
                                    <strong>Humidity</strong>
                                    {weatherData.humidity}
                                </div>
                                <div className="weather-detail">
                                    <strong>Wind</strong>
                                    {weatherData.wind}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading weather...</p>
                    )}
                </div>

                {/* Calendar / Events Card */}
                <div className="column-card calendar-card" style={{ marginTop: '1rem' }}>
                    <h3>Upcoming Events</h3>
                    {eventsData.length > 0 ? (
                        <ul className="mess-menu-items"> {/* Reusing list style */}
                            {eventsData.map(event => (
                                <li key={event.id}>
                                    <strong>{new Date(event.date).toLocaleDateString()}</strong>: {event.title}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming events.</p>
                    )}
                     <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                         <Link to="/calendar" className="service-link" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>View Full Calendar</Link>
                     </div>
                </div>
            </div>

            {/* Lost & Found */}
            <div className="column-card lost-found-card">
                <h3>Lost & Found</h3>
                <div className="lost-found-container">
                    {lostFoundData.length > 0 ? (
                        lostFoundData.map(item => (
                            <div className="lost-found-item" key={item.id}>
                                <div className="lost-found-item-header">
                                    <span className={`item-type ${item.type === 'lost' ? 'lost' : 'found'}`}>
                                        {item.type}
                                    </span>
                                    <span className="item-date">{new Date(item.date).toLocaleDateString()}</span>
                                </div>
                                <div className="item-title">{item.title}</div>
                                <div className="item-description">{item.description}</div>
                                <div className="item-location">📍 {item.location}</div>
                            </div>
                        ))
                    ) : (
                        <p className="loading-item">No recent items reported.</p>
                    )}
                    <div className="view-all-link">
                         <Link to="/lost-and-found" className="view-all-btn">View All</Link>
                    </div>
                </div>
            </div>

             {/* Quick Links / Services */}
             <div className="column-card">
                <h3>Quick Services</h3>
                <ul className="mess-menu-items">
                    <li><Link to="/services/mess-menu">Mess Menu</Link></li>
                    <li><Link to="/services/bus-schedule">Bus Schedule</Link></li>
                    <li><Link to="/services/laundry">Laundry Status</Link></li>
                    <li><Link to="/clubs">Clubs & Committees</Link></li>
                </ul>
                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                    <Link to="/services" className="service-link">All Services</Link>
                </div>
             </div>

        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;
