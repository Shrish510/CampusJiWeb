function handleLogout() {
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });
  }
}

function highlightNav() {
  const path = window.location.pathname;
  const pageName = path.split("/").pop();

  const links = {
    "main.html": "homeLink",
    "about-us.html": "aboutLink",
    "ClubsComs.html": "clubsLink",
    "services.html": "servicesLink",
    "contact_repository.html": "servicesLink",
    "grievance.html": "servicesLink",
    "ipm_social.html": "socialLink",
  };

  const activeLinkId = links[pageName];
  if (activeLinkId) {
    document.getElementById(activeLinkId)?.classList.add("active");
  } else if (pageName === "ClubsComs.html") {
    document.querySelector('a[href="ClubsComs.html"]')?.classList.add("active");
  } else if (pageName === "ipm_social.html") {
    document.querySelector('a[href="ipm_social.html"]')?.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.getElementById("header-container");
      if (headerContainer) {
        headerContainer.innerHTML = data;
        handleLogout();
        highlightNav();
      }
    })
    .catch((error) => console.error("Error fetching header:", error));
});
