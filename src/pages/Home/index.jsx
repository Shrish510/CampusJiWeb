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
      try {
        // 1. Fetch Slider Data
        let { data: slider, error: sliderError } = await supabase
            .from('slider')
            .select('*');

        // If error or empty, use fallback
        if (sliderError || !slider || slider.length === 0) {
            console.warn("Using fallback slider data. Error:", sliderError?.message);
            slider = [
                { id: 1, image_url: '/images/AcBanner.webp', title: 'Welcome to CampusJi', description: 'Your campus companion' },
                { id: 2, image_url: '/images/LitBan.webp', title: 'Stay Connected', description: 'Find all campus updates here' }
            ];
        }
        setSliderData(slider);

        // 2. Fetch Lost & Found Data
        const { data: lostFound, error: lfError } = await supabase
            .from('lost_found')
            .select('*')
            .order('date', { ascending: false })
            .limit(3);

        if (lfError) {
            console.warn("Error fetching lost & found:", lfError.message);
            // Don't set fallback data for Lost Found, let it show "No recent items"
        } else {
            setLostFoundData(lostFound || []);
        }

        // 3. Fetch Events (Calendar)
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

        // 4. Fetch Weather
        // Since we don't have a real weather API key here, we rely on a 'weather' table or mock
        const { data: weather, error: weatherError } = await supabase
            .from('weather')
            .select('*')
            .limit(1)
            .single();

        if (weatherError || !weather) {
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

      } catch (err) {
        console.error("Critical error in Home fetchData:", err);
        // Ensure at least slider has something so page isn't empty
        setSliderData([
             { id: 1, image_url: '/images/AcBanner.webp', title: 'Welcome to CampusJi', description: 'Your campus companion' }
        ]);
        setWeatherData({
             temp: '--', condition: 'Data Error', location: 'Unknown', humidity: '--', wind: '--'
        });
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
      if (sliderData.length > 0)
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
      if (sliderData.length > 0)
        setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content home-content" style={{ marginTop: '2rem' }}>

        {/* Slider Section */}
        {sliderData.length > 0 ? (
            <section className="slider-container">
                <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {sliderData.map((slide, index) => (
                        <div className="slide" key={slide.id || index}>
                            <img
                                src={slide.image_url || '/images/placeholder.jpg'}
                                alt={slide.title}
                                onError={(e) => {
                                    console.warn("Image failed to load:", slide.image_url);
                                    e.target.src = '/images/Campusjilogo.webp'; // Safe fallback
                                    e.target.style.objectFit = "contain";
                                    e.target.style.padding = "2rem";
                                    e.target.style.backgroundColor = "#f0f0f0";
                                }}
                            />
                            <div className="slide-overlay">
                                <h2 className="slide-title">{slide.title}</h2>
                                <p className="slide-description">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {sliderData.length > 1 && (
                    <>
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
                    </>
                )}
            </section>
        ) : (
             // Fallback if slider data is completely empty (should satisfy "not empty")
             <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '10px', marginBottom: '2rem' }}>
                 <h2>Welcome to CampusJi</h2>
                 <p>Loading updates...</p>
             </div>
        )}

        {/* 3-Column Section: Weather, Calendar, Lost & Found */}
        <section className="three-column-section">

            {/* Weather & Calendar */}
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
                        <ul className="mess-menu-items">
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
