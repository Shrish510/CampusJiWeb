

window.getBasePath = window.getBasePath || function() {
    let path = window.location.pathname;
    if (path.includes('/CampusJiWeb/')) {
        path = path.split('/CampusJiWeb/')[1];
    }
    const parts = path.split('/').filter(p => p !== '' && !p.endsWith('.html'));
    return parts.length > 0 ? '../'.repeat(parts.length) : './';
};
var basePath = window.getBasePath();


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
    window.location.href = basePath + "login/";
  });
  loginLogoutLinkContainer.appendChild(logoutLink);
} else {
  const loginLink = document.createElement("a");
  loginLink.href = basePath + "login/";
  loginLink.classList.add("nav-link");
  loginLink.textContent = "Login";
  loginLogoutLinkContainer.appendChild(loginLink);
}
