document.addEventListener('DOMContentLoaded', function () {
    // Fetch header and other scripts remain the same
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = data;
            // Navigation link highlighting logic
            const path = window.location.pathname;
            if (path.includes('ClubsComs.html')) {
              document.querySelector('a[href="ClubsComs.html"]')?.classList.add('active');
            } else if (path.includes('login.html')) {
                document.getElementById('loginLink')?.classList.add('active');
            }
        }
      });

    window.toggleTeam = function (id) {
        // Toggle logic for team sections
        const teamSection = document.getElementById(id + '-team');
        const icon = document.getElementById(id + '-icon');
        if (teamSection) {
            teamSection.classList.toggle('expanded');
            icon.textContent = teamSection.classList.contains('expanded') ? '▲' : '▼';
        }
    }

    window.toggleCarousel = function (button, id) {
        // Toggle logic for carousels
        const carousel = document.getElementById(id);
        if (carousel) {
            carousel.classList.toggle('expanded');
        }
    }
});
