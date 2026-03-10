import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/style.css'; // Inheriting styles from main and style.css

const MapPage = () => {
    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <section className="map-section">
                    <h2>Map of IIM Rohtak</h2>
                    <div className="map-placeholder">
                        <p>Interactive Map Coming Soon...</p>
                        {/* We could embed an iframe here if there's a Google Maps link or similar available */}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default MapPage;
