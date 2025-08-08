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

  if (!isLoginPage) {
    fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
        const headerContainer = document.getElementById("header-container");
        if (headerContainer) {
          headerContainer.innerHTML = data;

          const logoutLink = document.getElementById("logoutLink");
          if (logoutLink) {
            logoutLink.addEventListener("click", function (e) {
              e.preventDefault();
              localStorage.removeItem("isLoggedIn");
              window.location.href = "index.html";
            });
          }

          const path = window.location.pathname;
          const pageName = path.split("/").pop();

          if (pageName === "main.html") {
            document.getElementById("homeLink")?.classList.add("active");
          } else if (
            pageName === "about us.html" ||
            pageName === "about%20us.html"
          ) {
            document.getElementById("aboutLink")?.classList.add("active");
          } else if (pageName === "ClubsComs.html") {
            document
              .querySelector('a[href="ClubsComs.html"]')
              ?.classList.add("active");
          } else if (
            pageName === "services.html" ||
            pageName === "contact_repository.html" ||
            pageName === "grievance.html"
          ) {
            document.getElementById("servicesLink")?.classList.add("active");
          } else if (pageName === "ipm_social.html") {
            document
              .querySelector('a[href="ipm_social.html"]')
              ?.classList.add("active");
          }
        }
      })
      .catch((error) => console.error("Error fetching header:", error));
  }
});
