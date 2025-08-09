document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const supabase = window.supabase.createClient('https://jqiifqmiucpqeiytqhkk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4');

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                alert("Error logging in: " + error.message);
            } else {
                // The auth.js file will handle storing user info and redirecting
            }
        });
    }
});
