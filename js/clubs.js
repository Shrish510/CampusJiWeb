document.addEventListener("DOMContentLoaded", function () {
  // Removed redundant header loading logic. auth.js now handles this.

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
