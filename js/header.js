const loginLogoutLinkContainer = document.getElementById(
  "login-logout-link-container"
);

if (localStorage.getItem("isLoggedIn") === "true") {
  const logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.classList.add("nav-link");
  logoutLink.textContent = "Logout";
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    window.location.href = "login.html";
  });
  loginLogoutLinkContainer.appendChild(logoutLink);
} else {
  const loginLink = document.createElement("a");
  loginLink.href = "login.html";
  loginLink.classList.add("nav-link");
  loginLink.textContent = "Login";
  loginLogoutLinkContainer.appendChild(loginLink);
}
