import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HiddenPage = () => {
    return (
        <div className="page-container" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Header />
            <main className="main-content" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
                <h1 style={{ color: '#081F5C', borderBottom: '2px solid #7096D1', paddingBottom: '0.5rem' }}>This is a Hidden Page</h1>
                <p style={{ color: '#666' }}>This content is not meant to be publicly discoverable via search engines.</p>

                <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />

                <h1 style={{ color: '#081F5C' }}>Team Details</h1>
                <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '2rem', border: '1px solid #ddd' }}>
                    <thead style={{ backgroundColor: '#f9f9f9' }}>
                        <tr>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Roll Number</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Aditi Niraj Bajaj</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>IPM05003</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                    <li>Video Editing</li>
                                    <li>Clubs and Committees Page</li>
                                    <li>IPM Social</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Anish Singhal</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>IPM05008</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                    <li>Back-end Integration</li>
                                    <li>Lost and Found</li>
                                    <li>Court Booking</li>
                                    <li>Parcel Hub</li>
                                    <li>About Us</li>
                                    <li>Business Model Canvas</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Anushree Shivkumar</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>IPM05011</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                    <li>Back-end Integration</li>
                                    <li>Homepage</li>
                                    <li>IPM Social</li>
                                    <li>Responsive Design</li>
                                    <li>Header and Footer</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Aryaa Kanodia</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>IPM05014</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                    <li>Logo Design</li>
                                    <li>Contact Repository</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Kaavyaa Gupta</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>IPM05184</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                    <li>Back-end Integration</li>
                                    <li>Grievance Redressal</li>
                                    <li>Stakeholder Analysis</li>
                                    <li>About Us</li>
                                    <li>Hidden Page</li>
                                    <li>Security.txt</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Nandini Jain</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>IPM05044</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                    <li>Contact Repository</li>
                                    <li>Logo Design</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Shrish Bhattacharya</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>IPM05059</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                    <li>Back-end Integration</li>
                                    <li>Homepage</li>
                                    <li>Grievance Redressal</li>
                                    <li>Parcel Hub</li>
                                    <li>HTTPS integration</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />

                <h1 style={{ color: '#081F5C' }}>Philosophy</h1>
                <p><strong>CampusJi – The Story Behind the Curtain</strong></p>

                <p><strong>Phase 1 – The Newbie’s Odyssey</strong><br/>
                    You walk through the main gates of campus for the first time.<br/>
                    Back home, your parents think you’re about to conquer the academic world.<br/>
                    Reality? You’re Googling “best place to get chai near hostel” at 11 pm.
                </p>

                <p>The first few days feel like you’ve been dropped into a video game with no tutorial.</p>

                <p>Finding Clubs: You hear there’s a music club… but only people who “know someone” actually know when auditions happen.<br/>
                    Where to Eat: Seniors say there’s a hidden momo shop near Gate 3 that “changes lives.” You have no clue where Gate 3 is.<br/>
                    Lost & Found: Your umbrella is gone. Or maybe it’s just on a magical journey you’ll never hear about again.<br/>
                    Booking Courts: You want to play basketball. But the regular ones occupy every single day.
                </p>

                <p>This is the asymmetric information problem. If you have access to seniors, life’s easy. If not, it’s like trying to navigate with a map written in invisible ink.</p>

                <p><strong>Phase 2 – Enter CampusJi</strong><br/>
                    Now imagine instead of 10 WhatsApp groups, 3 paper notices, 4 random spreadsheets, and 50 “Bro, just ask XYZ senior” moments…<br/>
                    …there’s one portal that says:
                </p>

                <ul style={{ marginLeft: '20px', marginBottom: '1rem', listStyleType: 'circle' }}>
                    <li>Clubs? Here’s the info, upcoming events, and who to contact.</li>
                    <li>Lost something? Here’s the list, pictures, and pickup instructions.</li>
                    <li>Parcel arrived? You’ll know the exact number to collect rather than scanning through a register for 10 minutes.</li>
                    <li>Want to book a court? See what’s free, and reserve in seconds.</li>
                    <li>Got a complaint? Submit it with the click of a key and track progress transparently.</li>
                    <li>Curious about the city? See reviews, maps, and experiences from fellow students.</li>
                </ul>

                <p><strong>Phase 3 – Why We Built It This Way</strong><br/>
                    CampusJi isn’t just a website. It’s a campus operating system.
                </p>

                <p>We studied how MyGate and ADDA did it for apartments — giving one place for all resident needs. Then we realised: colleges are micro-cities, and students deserve the same centralisation.</p>

                <p>By focusing on the student journey from Day 1 to Graduation, we identified bottlenecks at each stage and designed features to unblock them. We also conducted a thorough stakeholder analyses with primary research data to ensure our observations aligned directly with the masses.</p>

                <p><strong>Phase 4 – Future Expansion</strong><br/>
                    Our vision is to make CampusJi a living, breathing student hub.<br/>
                    Future additions:
                </p>

                <ul style={{ marginLeft: '20px', marginBottom: '1rem', listStyleType: 'circle' }}>
                    <li>Class and yoga attendance tracking</li>
                    <li>Nescafe live menu (so you know when Maggi is actually available)</li>
                    <li>Integration for academic schedules</li>
                    <li>Marketplace for books and essentials</li>
                    <li>One-stop dashboard for prospective students to explore campus life</li>
                </ul>
                <p>CampusJi, just like MyGate and Adda can further expand into other colleges. Our unique selling point lies in our thorough stakeholder analyses to identify pain points that have been normalised by students and offer a one stop solution to solve them. This not only entails colleges in India but also those abroad, as is evident from the testimonials of other prospective stakeholders further down on this page.</p>

                <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />

                <h1 style={{ color: '#081F5C' }}>Rationale for Website Structure and Navigation</h1>
                <p> A stakeholder analysis was conducted to help structure the website in accordance with the stakeholders&apos; needs.<br/>
                    A Google form survey was floated across batches of IIM Rohtak for the same.<br/>
                    The questionnaire and responses can be accessed <a href="https://docs.google.com/forms/d/1VVvttIW3aTCxMiVU2jQctOXqdeZq6Dtljc1VCUsVPuk/edit#responses" target="_blank" rel="noopener noreferrer" style={{ color: '#7096D1' }}>here.</a>
                </p>

                <p>The following results were obtained from the Google Form, which helped us in structuring the final website:</p>

                <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '2rem', border: '1px solid #ddd' }}>
                    <thead style={{ backgroundColor: '#f9f9f9' }}>
                        <tr>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>No.</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Stakeholder Analysis Result</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Action Taken</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Rationale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>1.</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>A lack of a consolidated place for essential numbers and tracking for solving hostel-level issues emerged as the foremost issues of urgency. This was followed by the problems of flipping through the parcel register to find your name, lost and found group being full, and the basketball and badminton courts never being free.</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Service tab placed immediately after the homepage.</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Stakeholders are our priority, and to ensure that they get their work done in the least possible time, we have formatted the webpages in order of urgency. All five of the stated problems are included in the service section of the website, leading to the service section naturally being put immediately after the homepage.</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>2.</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Stakeholders prefer formal labels.</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Labels like &quot;Contact Repository&quot;, &quot;Grievance Redressal System&quot;, &quot;Court Booking&quot; used.</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Stakeholder analysis found that stakeholders prefer formal labels for easy interpretation and navigation. Thus, formal labels used. This ensures easy navigation even for someone who is new to the website.</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>3.</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>71.7% stakeholders prefer categories/tabs for each section over having everything on the homepage, or searching through the search bar.</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Seperate webpages structured for different sections</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Stakeholders prefer separate subsections for clearer navigation. So, we structured similar contents into one heading and made separate subsections per heading.</td>
                        </tr>
                    </tbody>
                </table>

                <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />

                <h1 style={{ color: '#081F5C' }}>Business Model Canvas</h1>
                {/* Fallback standard base url implementation for assets */}
                <img src={`${import.meta.env.BASE_URL}images/Business Model Canvas.webp`} alt="Business Model Canvas" style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto' }} />

                <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />

                <h1 style={{ color: '#081F5C' }}>Future Prospects and Scaling</h1>
                <p>We plan to expand CampusJi to other colleges, both within India and internationally. For each institution, we can conduct a detailed stakeholder analysis to understand their unique challenges and then customise the platform to provide targeted solutions. Student bodies and university administrations can engage our services through a subscription-based model, ensuring ongoing support, updates, and feature enhancements tailored to their needs.</p>
            </main>
            <Footer />
        </div>
    );
};

export default HiddenPage;
