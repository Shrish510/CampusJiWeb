document.addEventListener('DOMContentLoaded', function () {
    // If user is already logged in, redirect them to the main page
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'main.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email.trim() === '' || password.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // This simulates a successful login.
            // In a real app, you'd verify credentials with a server.
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect to the main page after successful login
            window.location.href = 'main.html';
        });
    }
});
