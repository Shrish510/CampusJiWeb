document.addEventListener("DOMContentLoaded", function () {
  const isLoginPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname.endsWith("signup.html") ||
    window.location.pathname.endsWith("forgot-password.html");

  if (localStorage.getItem("isLoggedIn") !== "true" && !isLoginPage) {
    window.location.href = "index.html";
    return;
  }
});
