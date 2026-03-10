import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './clubs.module.css'; // Import the specific styles for this page

const Clubs = () => {
    // State to manage which team section is visible
    const [visibleTeam, setVisibleTeam] = useState(null);

    const toggleTeam = (teamId) => {
        if (visibleTeam === teamId) {
            setVisibleTeam(null); // Close if already open
        } else {
            setVisibleTeam(teamId); // Open the clicked one
        }
    };

    return (
        <div className={`${styles['page-container']}`}>
            <Header />
            <main className={`${styles['main-content']}`}>
                <section className={`${styles['section']} ${styles['committees-section']}`} id="committees">
                    <div className={`${styles['container']}`}>
                        <h2 className={`${styles['section-title']} ${styles['fade-in']}`}>Committees</h2>
                        <div className={`${styles['cards-grid']}`}>
                            {/* Academic Committee */}
                            <div className={`${styles['card']} ${styles['fade-in']}`}>
                                <div className={`${styles['card-banner']} ${styles['academic-banner']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/AcBanner.png)` }}></div>
                                <div className={`${styles['card-header']}`}>
                                    <div className={`${styles['card-logo']}`}>
                                        <img src={`${import.meta.env.BASE_URL}images/ACLogo.png`} alt="Academic Committee Logo" />
                                    </div>
                                    <div>
                                        <h3 className={`${styles['card-title']}`}>Academic Committee</h3>
                                    </div>
                                </div>
                                <p className={`${styles['card-description']}`}>
                                    Acts as the bridge between IPM students and the administration, ensuring seamless communication, organizing workshops, and helping maintain academic discipline. Supports faculty during batch inductions.
                                </p>
                                <div className={`${styles['card-links']}`}>
                                    <button className={`${styles['card-link']} ${styles['members']}`} onClick={() => toggleTeam('academic')}>
                                        Meet the Team
                                        <span className={`${styles['toggle-icon']}`} id="academic-icon">
                                            {visibleTeam === 'academic' ? '▲' : '▼'}
                                        </span>
                                    </button>
                                    <a className={`${styles['card-link']} ${styles['events']}`} href="https://drive.google.com/drive/folders/1iZLwZUkb3_7S3KMgoMzWaqniSzhBocwb?usp=sharing" target="_blank" rel="noopener noreferrer">
                                        Event Gallery
                                    </a>
                                </div>
                                <div className={`${styles['team-section']} ${visibleTeam === 'academic' ? styles['active'] : ''}`} id="academic-team" style={{ display: visibleTeam === 'academic' ? 'block' : 'none' }}>
                                    <h4 className={`${styles['team-title']}`}>Senior Team</h4>
                                    <div className={`${styles['team-grid']}`}>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-shrish']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/shrish.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Shrish</div>
                                            <div className={`${styles['team-member-role']}`}>Senior Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-akruti']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/akruti.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Akruti</div>
                                            <div className={`${styles['team-member-role']}`}>Senior Coordinator</div>
                                        </div>
                                    </div>
                                    <h4 className={`${styles['team-title']}`}>Junior Team</h4>
                                    <div className={`${styles['team-grid']}`}>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-madhur']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/madhur.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Madhur</div>
                                            <div className={`${styles['team-member-role']}`}>Junior Member</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-sanchi']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/sanchi.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Sanchi</div>
                                            <div className={`${styles['team-member-role']}`}>Junior Member</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Internship Committee */}
                            <div className={`${styles['card']} ${styles['fade-in']}`}>
                                <div className={`${styles['card-banner']} ${styles['internship-banner']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/IcBanner.png)` }}></div>
                                <div className={`${styles['card-header']}`}>
                                    <div className={`${styles['card-logo']}`}>
                                        <img src={`${import.meta.env.BASE_URL}images/ICLogoUpdated.png`} alt="Internship Committee Logo" />
                                    </div>
                                    <div>
                                        <h3 className={`${styles['card-title']}`}>Internship Committee</h3>
                                    </div>
                                </div>
                                <p className={`${styles['card-description']}`}>
                                    Works closely with corporates to bring internship and live project opportunities for IPM students. Organizes corporate connect sessions and guest lectures to bridge the industry-academia gap and help students prepare for professional life.
                                </p>
                                <div className={`${styles['card-links']}`}>
                                    <button className={`${styles['card-link']} ${styles['members']}`} onClick={() => toggleTeam('internship')}>
                                        Meet the Team
                                        <span className={`${styles['toggle-icon']}`} id="internship-icon">
                                            {visibleTeam === 'internship' ? '▲' : '▼'}
                                        </span>
                                    </button>
                                    <a className={`${styles['card-link']} ${styles['events']}`} href="https://drive.google.com/drive/folders/1_BJ6eCNkwgWQxpsAeC0pE8il9Bd2AKKt?usp=drive_link" target="_blank" rel="noopener noreferrer">
                                        Event Gallery
                                    </a>
                                </div>
                                <div className={`${styles['team-section']} ${visibleTeam === 'internship' ? styles['active'] : ''}`} id="internship-team" style={{ display: visibleTeam === 'internship' ? 'block' : 'none' }}>
                                    <h4 className={`${styles['team-title']}`}>Senior Team</h4>
                                    <div className={`${styles['team-grid']}`}>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-aditi']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/aditi.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Aditi</div>
                                            <div className={`${styles['team-member-role']}`}>Senior Internship Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-anushree']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/anushree.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Anushree</div>
                                            <div className={`${styles['team-member-role']}`}>Senior Internship Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-aryaa']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/aryaa.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Aryaa</div>
                                            <div className={`${styles['team-member-role']}`}>Senior Internship Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-somansha']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/somansha.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Somansha</div>
                                            <div className={`${styles['team-member-role']}`}>Senior Internship Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-upagnya']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/upagnya.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Upagnya</div>
                                            <div className={`${styles['team-member-role']}`}>Senior Internship Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-utkarsh']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/utkarsh.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Utkarsh</div>
                                            <div className={`${styles['team-member-role']}`}>Senior Internship Coordinator</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={`${styles['section']} ${styles['clubs-section']}`} id="clubs">
                    <div className={`${styles['container']}`}>
                        <h2 className={`${styles['section-title']} ${styles['fade-in']}`}>Clubs</h2>
                        <div className={`${styles['cards-grid']}`}>
                            {/* Athlos */}
                            <div className={`${styles['card']} ${styles['fade-in']}`}>
                                <div className={`${styles['card-banner']} ${styles['athlos-banner']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/AthBanner.png)` }}></div>
                                <div className={`${styles['card-header']}`}>
                                    <div className={`${styles['card-logo']}`}>
                                        <img src={`${import.meta.env.BASE_URL}images/AthLogo.png`} alt="Athlos Logo" />
                                    </div>
                                    <div>
                                        <h3 className={`${styles['card-title']}`}>Athlos (Sports Club)</h3>
                                    </div>
                                </div>
                                <p className={`${styles['card-description']}`}>
                                    Builds a sporting culture on campus by organizing tournaments and promoting mass participation. Focuses on sportsmanship, team spirit, talent development, and improving sports infrastructure to represent the institute at various events.
                                </p>
                                <div className={`${styles['card-links']}`}>
                                    <button className={`${styles['card-link']} ${styles['members']}`} onClick={() => toggleTeam('athlos')}>
                                        Meet the Team
                                        <span className={`${styles['toggle-icon']}`} id="athlos-icon">
                                            {visibleTeam === 'athlos' ? '▲' : '▼'}
                                        </span>
                                    </button>
                                    <a className={`${styles['card-link']} ${styles['events']}`} href="https://drive.google.com/drive/folders/1k89wXwo4fEuicWUB5NVkdbCRNBTQLQ_d?usp=sharing_eil_se_dm&ts=6870cc1d" target="_blank" rel="noopener noreferrer">
                                        Event Gallery
                                    </a>
                                </div>
                                <div className={`${styles['team-section']} ${visibleTeam === 'athlos' ? styles['active'] : ''}`} id="athlos-team" style={{ display: visibleTeam === 'athlos' ? 'block' : 'none' }}>
                                    <h4 className={`${styles['team-title']}`}>Senior Team</h4>
                                    <div className={`${styles['team-grid']} ${styles['two-column']}`}>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-dev']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/dev.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Dev</div>
                                            <div className={`${styles['team-member-role']}`}>Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-bhavya']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bhavya.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Bhavya</div>
                                            <div className={`${styles['team-member-role']}`}>Co-coordinator</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Riwaayat */}
                            <div className={`${styles['card']} ${styles['fade-in']}`}>
                                <div className={`${styles['card-banner']} ${styles['riwaayat-banner']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/RiwBanner.png)` }}></div>
                                <div className={`${styles['card-header']}`}>
                                    <div className={`${styles['card-logo']}`}>
                                        <img src={`${import.meta.env.BASE_URL}images/RiwLogo.png`} alt="Riwaayat Logo" />
                                    </div>
                                    <div>
                                        <h3 className={`${styles['card-title']}`}>Riwaayat (Cultural Club)</h3>
                                    </div>
                                </div>
                                <p className={`${styles['card-description']}`}>
                                    Promotes creativity by organizing events and competitions in art & craft, dance, drama, music, and fashion. Keeps students connected with many cultural values and traditions, and coordinates celebrations.
                                </p>
                                <div className={`${styles['card-links']}`}>
                                    <button className={`${styles['card-link']} ${styles['members']}`} onClick={() => toggleTeam('riwaayat')}>
                                        Meet the Team
                                        <span className={`${styles['toggle-icon']}`} id="riwaayat-icon">
                                            {visibleTeam === 'riwaayat' ? '▲' : '▼'}
                                        </span>
                                    </button>
                                    <a className={`${styles['card-link']} ${styles['events']}`} href="https://drive.google.com/drive/folders/17n4DwcJ03-YqdTt0XOTYry7jaBc3U_m8?usp=drive_link" target="_blank" rel="noopener noreferrer">
                                        Event Gallery
                                    </a>
                                </div>
                                <div className={`${styles['team-section']} ${visibleTeam === 'riwaayat' ? styles['active'] : ''}`} id="riwaayat-team" style={{ display: visibleTeam === 'riwaayat' ? 'block' : 'none' }}>
                                    <h4 className={`${styles['team-title']}`}>Senior Team</h4>
                                    <div className={`${styles['team-grid']} ${styles['two-column']}`}>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-ishika']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/ishika.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Ishika</div>
                                            <div className={`${styles['team-member-role']}`}>Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-mrinali']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/mrinali.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Mrinali</div>
                                            <div className={`${styles['team-member-role']}`}>Co-coordinator</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Literati */}
                            <div className={`${styles['card']} ${styles['fade-in']}`}>
                                <div className={`${styles['card-banner']} ${styles['literati-banner']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/LitBanner.png)` }}></div>
                                <div className={`${styles['card-header']}`}>
                                    <div className={`${styles['card-logo']}`}>
                                        <img src={`${import.meta.env.BASE_URL}images/LitLogo.png`} alt="Literati Logo" />
                                    </div>
                                    <div>
                                        <h3 className={`${styles['card-title']}`}>Literati (Literary Club)</h3>
                                    </div>
                                </div>
                                <p className={`${styles['card-description']}`}>
                                    Organizes debate, extempore, and essay writing competitions. Publishes newsletters and magazines to encourage creative expression. Provides a platform for students to hone their speaking, writing, and analytical skills.
                                </p>
                                <div className={`${styles['card-links']}`}>
                                    <button className={`${styles['card-link']} ${styles['members']}`} onClick={() => toggleTeam('literati')}>
                                        Meet the Team
                                        <span className={`${styles['toggle-icon']}`} id="literati-icon">
                                            {visibleTeam === 'literati' ? '▲' : '▼'}
                                        </span>
                                    </button>
                                    <a className={`${styles['card-link']} ${styles['events']}`} href="https://drive.google.com/drive/folders/1-65C9lqXozICAAtubh2tH5sBL4T5ACtX?usp=sharing" target="_blank" rel="noopener noreferrer">
                                        Event Gallery
                                    </a>
                                </div>
                                <div className={`${styles['team-section']} ${visibleTeam === 'literati' ? styles['active'] : ''}`} id="literati-team" style={{ display: visibleTeam === 'literati' ? 'block' : 'none' }}>
                                    <h4 className={`${styles['team-title']}`}>Senior Team</h4>
                                    <div className={`${styles['team-grid']} ${styles['two-column']}`}>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-mannat']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/mannat.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Mannat</div>
                                            <div className={`${styles['team-member-role']}`}>Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-sarthak']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/sarthak.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Sarthak</div>
                                            <div className={`${styles['team-member-role']}`}>Co-coordinator</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Utthaan */}
                            <div className={`${styles['card']} ${styles['fade-in']}`}>
                                <div className={`${styles['card-banner']} ${styles['utthaan-banner']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/UthBanner.png)` }}></div>
                                <div className={`${styles['card-header']}`}>
                                    <div className={`${styles['card-logo']}`}>
                                        <img src={`${import.meta.env.BASE_URL}images/UthLogo.png`} alt="Utthaan Logo" />
                                    </div>
                                    <div>
                                        <h3 className={`${styles['card-title']}`}>Utthaan (Social Welfare Club)</h3>
                                    </div>
                                </div>
                                <p className={`${styles['card-description']}`}>
                                    Dedicated to creating a positive social impact. Organizes and participates in community service initiatives, awareness campaigns, and social welfare projects to contribute meaningfully to society.
                                </p>
                                <div className={`${styles['card-links']}`}>
                                    <button className={`${styles['card-link']} ${styles['members']}`} onClick={() => toggleTeam('utthaan')}>
                                        Meet the Team
                                        <span className={`${styles['toggle-icon']}`} id="utthaan-icon">
                                            {visibleTeam === 'utthaan' ? '▲' : '▼'}
                                        </span>
                                    </button>
                                    <a className={`${styles['card-link']} ${styles['events']}`} href="https://drive.google.com/drive/folders/1EMoi0nsRmRT-MvuDPMuxoG8L6Oxb4u56?usp=share_link" target="_blank" rel="noopener noreferrer">
                                        Event Gallery
                                    </a>
                                </div>
                                <div className={`${styles['team-section']} ${visibleTeam === 'utthaan' ? styles['active'] : ''}`} id="utthaan-team" style={{ display: visibleTeam === 'utthaan' ? 'block' : 'none' }}>
                                    <h4 className={`${styles['team-title']}`}>Senior Team</h4>
                                    <div className={`${styles['team-grid']} ${styles['two-column']}`}>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-nandini']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/nandini.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Nandini</div>
                                            <div className={`${styles['team-member-role']}`}>Coordinator</div>
                                        </div>
                                        <div className={`${styles['team-member-card']}`}>
                                            <div className={`${styles['team-member-photo']} ${styles['photo-divya']}`} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/divya.jpg)` }}></div>
                                            <div className={`${styles['team-member-name']}`}>Divya</div>
                                            <div className={`${styles['team-member-role']}`}>Co-coordinator</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Clubs;