document.addEventListener("DOMContentLoaded", function () {
    const supabase = window.supabase.createClient('https://jqiifqmiucpqeiytqhkk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4');
    const protectedRoutes = ['index.html', 'about us.html', 'ClubsComs.html', 'services.html', 'ipm_social.html', 'grievance.html', 'contact_repository.html', 'lost-and-found.html', 'court-booking.html', 'parcel-hub.html'];
    const currentPage = window.location.pathname.split("/").pop();

    const loadHeader = (session) => {
        fetch("header.html")
            .then((response) => response.text())
            .then((data) => {
                const headerContainer = document.getElementById("header-container");
                if (headerContainer) {
                    headerContainer.innerHTML = data;

                    // Handle logout link visibility and functionality
                    const logoutLink = document.getElementById("logoutLink");
                    if (session) {
                        logoutLink.style.display = 'block';
                        logoutLink.addEventListener("click", async function (e) {
                            e.preventDefault();
                            await supabase.auth.signOut();
                        });
                    } else {
                        logoutLink.style.display = 'none';
                    }

                    // Set active navigation link
                    if (currentPage === "index.html" || currentPage === "") {
                        document.getElementById("homeLink")?.classList.add("active");
                    } else if (currentPage.includes("about")) {
                        document.getElementById("aboutLink")?.classList.add("active");
                    } else if (currentPage.includes("ClubsComs")) {
                        document.getElementById("clubsComsLink")?.classList.add("active");
                    } else if (currentPage.includes("services") || currentPage.includes("contact") || currentPage.includes("grievance") || currentPage.includes("lost-and-found") || currentPage.includes("court-booking") || currentPage.includes("parcel-hub")) {
                        document.getElementById("servicesLink")?.classList.add("active");
                    } else if (currentPage.includes("ipm_social")) {
                        document.getElementById("ipmSocialLink")?.classList.add("active");
                    }
                }
            })
            .catch((error) => console.error("Error fetching header:", error));
    };

    supabase.auth.onAuthStateChange((event, session) => {
        loadHeader(session); // Load or reload the header based on auth state

        if (session) {
            const userInfo = {
                email: session.user.email,
                loginTime: new Date().toISOString(),
                isLoggedIn: true,
                permission: session.user.user_metadata.role || 'user',
                role: session.user.user_metadata.role || 'student',
                name: session.user.user_metadata.full_name || session.user.email.split('@')[0]
            };
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            if (currentPage === 'login.html' || currentPage === 'signup.html') {
                window.location.href = 'index.html';
            }
        } else {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            if (protectedRoutes.includes(currentPage)) {
                window.location.href = 'login.html';
            }
        }
    });
});
