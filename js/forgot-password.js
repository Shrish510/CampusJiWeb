document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;

            if (email.trim() === '') {
                alert('Please enter your email address.');
                return;
            }

            alert('If an account with that email exists, a password reset link has been sent.');
            window.location.href = 'login.html';
        });
    }
});
