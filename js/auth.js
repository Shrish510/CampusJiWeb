document.addEventListener('DOMContentLoaded', function() {
    const pageName = window.location.pathname.split("/").pop();
    // Correctly identify that the login pages are index.html and login.html
    const isLoginPage = pageName === 'index.html' || pageName === 'login.html' || pageName === '';

    // If not logged in and not on the login page, redirect
    if (localStorage.getItem('isLoggedIn') !== 'true' && !isLoginPage) {
        window.location.href = 'index.html';
        return; // Stop further script execution
    }

    // This script fetches the header from 'header.html' and inserts it.
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = data;

            // Add logout functionality after header is loaded
            const logoutLink = document.getElementById('logoutLink');
            if (logoutLink) {
                logoutLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    window.location.href = 'index.html';
                });
            }

            // Highlight active nav link based on current page
            const path = window.location.pathname;
            const currentPageName = path.split("/").pop();

            if (currentPageName === 'main.html' || (currentPageName === '' && !isLoginPage) ) {
              document.getElementById('homeLink')?.classList.add('active');
            } else if (currentPageName === 'about%20us.html' || currentPageName === 'about us.html') {
              document.getElementById('aboutLink')?.classList.add('active');
            } else if (currentPageName === 'ClubsComs.html') {
              document.querySelector('a[href="ClubsComs.html"]')?.classList.add('active');
            } else if (currentPageName === 'contact_repository.html') {
              document.querySelector('a[href="contact_repository.html"]')?.classList.add('active');
            }
        }
      })
      .catch(error => console.error('Error fetching header:', error));
});
