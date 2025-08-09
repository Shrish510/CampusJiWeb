document.addEventListener("DOMContentLoaded", function () {
    const supabase = window.supabase.createClient('https://jqiifqmiucpqeiytqhkk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4');
    const protectedRoutes = ['index.html', 'about us.html', 'ClubsComs.html', 'services.html', 'ipm_social.html', 'grievance.html', 'contact_repository.html', 'lost-and-found.html', 'court-booking.html', 'parcel-hub.html'];
    const currentPage = window.location.pathname.split("/").pop();

    supabase.auth.onAuthStateChange((event, session) => {
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

            // If user is on login or signup, redirect to main page (index.html)
            if (currentPage === 'login.html' || currentPage === 'signup.html') {
                window.location.href = 'index.html';
            }
        } else {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            // If user is on a protected page, redirect to login
            if (protectedRoutes.includes(currentPage)) {
                window.location.href = 'login.html';
            }
        }
    });

    // This logic dynamically loads the header and sets the active link
    fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
        const headerContainer = document.getElementById("header-container");
        if (headerContainer) {
          headerContainer.innerHTML = data;

          const logoutLink = document.getElementById("logoutLink");
          if (logoutLink) {
            logoutLink.addEventListener("click", async function (e) {
              e.preventDefault();
              await supabase.auth.signOut();
            });
          }

          const pageName = window.location.pathname.split("/").pop();
          
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

          if (pageName === "index.html" || pageName === "") {
            document.getElementById("homeLink")?.classList.add("active");
          } else if (pageName.includes("about")) {
            document.getElementById("aboutLink")?.classList.add("active");
          } else if (pageName.includes("ClubsComs")) {
            document.querySelector('a[href="ClubsComs.html"]')?.classList.add("active");
          } else if (pageName.includes("services") || pageName.includes("contact") || pageName.includes("grievance")) {
            document.getElementById("servicesLink")?.classList.add("active");
          } else if (pageName.includes("ipm_social")) {
            document.querySelector('a[href="ipm_social.html"]')?.classList.add("active");
          }
        }
      })
      .catch((error) => console.error("Error fetching header:", error));
});
