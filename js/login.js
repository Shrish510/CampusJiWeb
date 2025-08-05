document.addEventListener('DOMContentLoaded', function () {
    // This script fetches the header from 'header.html' and inserts it.
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = data;

            // Highlight active nav link based on current page
            const path = window.location.pathname;
            const pageName = path.split("/").pop();

            if (pageName === 'login.html') {
              document.getElementById('loginLink')?.classList.add('active');
            }
        }
      })
      .catch(error => console.error('Error fetching header:', error));

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation example
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email.trim() === '' || password.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // Here you would typically send the data to a server for authentication
            alert('Login functionality requires a backend server to be implemented.');
        });
    }
});
