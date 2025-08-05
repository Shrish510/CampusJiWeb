document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // e.preventDefault(); // This would prevent navigation
            // Add navigation logic here when other pages are created
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe team members for animation
    document.querySelectorAll('.team-member').forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.6s ease';
        observer.observe(member);
    });

    // LinkedIn icon click handlers
    document.querySelectorAll('.linkedin-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            // Add actual LinkedIn profile links here
            alert('LinkedIn profile link would open here');
        });
    });

    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = data;

            // Highlight active nav link based on current page
            const path = window.location.pathname;
            if (path.includes('index.html')) {
              document.getElementById('homeLink')?.classList.add('active');
            } else if (path.includes('about us.html') || path.includes('about%20us.html')) {
              document.getElementById('aboutLink')?.classList.add('active');
            } else if (path.includes('login.html')) {
                document.getElementById('loginLink')?.classList.add('active');
            }
        }
      });
});
