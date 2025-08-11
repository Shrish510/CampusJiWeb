function handleLoginLogoutLink() {
  const loginLogoutLink = document.getElementById("loginLogoutLink");
  if (loginLogoutLink) {
    if (localStorage.getItem("isLoggedIn") === "true") {
      loginLogoutLink.textContent = "Logout";
      loginLogoutLink.href = "#";
      loginLogoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userInfo");
        window.location.href = "login.html";
      });
    } else {
      loginLogoutLink.textContent = "Login";
      loginLogoutLink.href = "login.html";
    }
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
    document.querySelector('a[href="ClubsComs.html"]')?.classList.add("active");
  } else if (pageName === "ipm_social.html" || pageName === "pizza_places.html" || pageName === "burger_joints.html" || pageName === "dhaba_places.html") {
    document.querySelector('a[href="ipm_social.html"]')?.classList.add("active");
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

document.addEventListener("DOMContentLoaded", function () {
  // Fetch and insert header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.getElementById("header-container");
      if (headerContainer) {
        headerContainer.innerHTML = data;
        handleLoginLogoutLink();
        highlightNav();
        setupMobileMenu(); // Call the new mobile menu function
      }
    })
    .catch((error) => console.error("Error fetching header:", error));

  // Fetch and insert footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) {
        footerContainer.innerHTML = data;
      }
    })
    .catch((error) => console.error("Error fetching footer:", error));
});
