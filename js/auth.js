document.addEventListener("DOMContentLoaded", function () {
    const supabase = window.supabase.createClient('https://jqiifqmiucpqeiytqhkk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4');
    const protectedRoutes = ['main.html', 'about us.html', 'ClubsComs.html', 'services.html', 'ipm_social.html', 'grievance.html', 'contact_repository.html', 'lost-and-found.html', 'court-booking.html', 'parcel-hub.html'];
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

            if (currentPage === 'index.html' || currentPage === 'signup.html' || currentPage === '') {
                window.location.href = 'main.html';
            }
        } else {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            if (protectedRoutes.includes(currentPage)) {
                window.location.href = 'index.html';
            }
        }
    });

    // This logic needs to be inside the DOMContentLoaded event listener
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
              // The onAuthStateChange will handle the redirect
            });
          }

          const path = window.location.pathname;
          const pageName = path.split("/").pop();

          if (pageName === "main.html") {
            document.getElementById("homeLink")?.classList.add("active");
          } else if (
            pageName === "about us.html" ||
            pageName === "about%20us.html"
          ) {
            document.getElementById("aboutLink")?.classList.add("active");
          } else if (pageName === "ClubsComs.html") {
            document
              .querySelector('a[href="ClubsComs.html"]')
              ?.classList.add("active");
          } else if (
            pageName === "services.html" ||
            pageName === "contact_repository.html" ||
            pageName === "grievance.html"
          ) {
            document.getElementById("servicesLink")?.classList.add("active");
          } else if (pageName === "ipm_social.html") {
            document
              .querySelector('a[href="ipm_social.html"]')
              ?.classList.add("active");
          }
        }
      })
      .catch((error) => console.error("Error fetching header:", error));
});
