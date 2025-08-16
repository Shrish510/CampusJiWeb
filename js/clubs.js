document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerContainer = document.getElementById("header-container");
      if (headerContainer) {
        headerContainer.innerHTML = data;
        const path = window.location.pathname;
        if (path.includes("ClubsComs.html")) {
          document
            .querySelector('a[href="/ClubsComs/"]')
            ?.classList.add("active");
        } else if (path.includes("login.html")) {
          document.getElementById("loginLink")?.classList.add("active");
        }
      }
    });

  window.toggleTeam = function (id) {
    const teamSection = document.getElementById(id + "-team");
    const icon = document.getElementById(id + "-icon");
    if (teamSection) {
      teamSection.classList.toggle("expanded");
      icon.textContent = teamSection.classList.contains("expanded") ? "▲" : "▼";
    }
  };

  window.toggleCarousel = function (button, id) {
    const carousel = document.getElementById(id);
    if (carousel) {
      carousel.classList.toggle("expanded");
    }
  };
});
