

window.getBasePath = window.getBasePath || function() {
    let path = window.location.pathname;
    if (path.includes('/CampusJiWeb/')) {
        path = path.split('/CampusJiWeb/')[1];
    }
    const parts = path.split('/').filter(p => p !== '' && !p.endsWith('.html'));
    return parts.length > 0 ? '../'.repeat(parts.length) : './';
};
var basePath = window.getBasePath();


function handleLogout() {
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      window.location.href = basePath;
    });
  }
}

function highlightNav() {
  const path = window.location.pathname;
  const pageName = path.split("/").pop();

  const links = {
    "index.html": "homeLink",
    "about-us.html": "aboutLink",
    "ClubsComs.html": "clubsLink",
    "services.html": "servicesLink",
    "contact_repository.html": "servicesLink",
    "grievance.html": "servicesLink",
    "ipm_social.html": "socialLink",
    "pizza_places.html": "socialLink",
    "burger_joints.html": "socialLink",
    "dhaba_places.html": "socialLink",
  };

  const activeLinkId = links[pageName];
  if (activeLinkId) {
    document.getElementById(activeLinkId)?.classList.add("active");
  } else if (pageName === "ClubsComs.html") {
    document.querySelector('a[href="' + basePath + 'ClubsComs/"]')?.classList.add("active");
  } else if (pageName === "ipm_social.html" || pageName === "pizza_places.html" || pageName === "burger_joints.html" || pageName === "dhaba_places.html") {
    document.querySelector('a[href="' + basePath + 'ipm_social/"]')?.classList.add("active");
  }
}

// Function to handle the mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
}

function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
  // Fetch and insert header
  fetch(basePath + "header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.getElementById("header-container");
      if (headerContainer) {
        headerContainer.innerHTML = data.replace(/(href|src)=\"([^\"#:]+)\"/g, (match, attr, path) => attr + '="' + basePath + path + '"');
        handleLogout();
        highlightNav();
        setupMobileMenu(); // Call the new mobile menu function
        loadScript("js/header.js");
      }
    })
    .catch((error) => console.error("Error fetching header:", error));

  // Fetch and insert footer
  fetch(basePath + "footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) {
        footerContainer.innerHTML = data.replace(/(href|src)=\"([^\"#:]+)\"/g, (match, attr, path) => attr + '="' + basePath + path + '"');
      }
    })
    .catch((error) => console.error("Error fetching footer:", error));
});
