function handleLogout() {
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      window.location.href = "/";
    });
  }
}

function highlightNav() {
  let pageName = window.location.pathname.split("/").pop();
  if (pageName === "" || pageName === "index") {
    pageName = "index";
  }

  const links = {
    "index": "homeLink",
    "about-us": "aboutLink",
    "ClubsComs": "clubsLink",
    "services": "servicesLink",
    "contact_repository": "servicesLink",
    "grievance": "servicesLink",
    "ipm_social": "socialLink",
    "pizza_places": "socialLink",
    "burger_joints": "socialLink",
    "dhaba_places": "socialLink",
  };

  const activeLinkId = links[pageName];
  if (activeLinkId) {
    document.getElementById(activeLinkId)?.classList.add("active");
  } else if (pageName === "ClubsComs") {
    document.querySelector('a[href="/ClubsComs"]')?.classList.add("active");
  } else if (pageName === "ipm_social" || pageName === "pizza_places" || pageName === "burger_joints" || pageName === "dhaba_places") {
    document.querySelector('a[href="/ipm_social"]')?.classList.add("active");
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
  fetch("/header")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.getElementById("header-container");
      if (headerContainer) {
        headerContainer.innerHTML = data;
        handleLogout();
        highlightNav();
        setupMobileMenu(); // Call the new mobile menu function
        loadScript("js/header.js");
      }
    })
    .catch((error) => console.error("Error fetching header:", error));

  // Fetch and insert footer
  fetch("/footer")
    .then((response) => response.text())
    .then((data) => {
      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) {
        footerContainer.innerHTML = data;
      }
    })
    .catch((error) => console.error("Error fetching footer:", error));
});
