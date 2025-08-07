document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const clearButton = document.getElementById("clearButton");

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filterContacts(searchTerm);
  }

  function clearSearch() {
    searchInput.value = "";
    filterContacts("");
  }

  function filterContacts(searchTerm) {
    const contactRows = document.querySelectorAll(".contact-row");
    let visibleCount = 0;
    let visibleCategories = {
      authorities: 0,
      campusServices: 0,
      localServices: 0,
    };

    contactRows.forEach((row) => {
      const name = row.querySelector(".contact-name").textContent.toLowerCase();
      const profession = row
        .querySelector(".contact-profession")
        .textContent.toLowerCase();
      const number = row
        .querySelector(".contact-number")
        .textContent.toLowerCase();

      const isVisible =
        searchTerm === "" ||
        name.includes(searchTerm) ||
        profession.includes(searchTerm) ||
        number.includes(searchTerm);

      if (isVisible) {
        row.classList.remove("hidden");
        visibleCount++;

        const category = row.getAttribute("data-category");
        if (category === "authorities") visibleCategories.authorities++;
        else if (category === "campus-services")
          visibleCategories.campusServices++;
        else if (category === "local-services")
          visibleCategories.localServices++;
      } else {
        row.classList.add("hidden");
      }
    });

    const authoritiesHeader = document.querySelector("thead:nth-of-type(1)");
    const campusServicesHeader = document.querySelector("thead:nth-of-type(2)");
    const localServicesHeader = document.querySelector("thead:nth-of-type(3)");

    if (authoritiesHeader)
      authoritiesHeader.style.display =
        visibleCategories.authorities > 0 ? "" : "none";
    if (campusServicesHeader)
      campusServicesHeader.style.display =
        visibleCategories.campusServices > 0 ? "" : "none";
    if (localServicesHeader)
      localServicesHeader.style.display =
        visibleCategories.localServices > 0 ? "" : "none";

    const resultsCounter = document.getElementById("resultsCounter");
    const noResults = document.getElementById("noResults");

    if (visibleCount === 0) {
      if (resultsCounter) resultsCounter.style.display = "none";
      if (noResults) noResults.style.display = "block";
    } else {
      if (resultsCounter) resultsCounter.style.display = "block";
      if (noResults) noResults.style.display = "none";

      if (searchTerm === "") {
        if (resultsCounter)
          resultsCounter.textContent = `Showing all ${contactRows.length} contacts`;
      } else {
        if (resultsCounter)
          resultsCounter.textContent = `Found ${visibleCount} contact${
            visibleCount !== 1 ? "s" : ""
          } matching your search`;
      }
    }
  }

  if (searchButton) searchButton.addEventListener("click", performSearch);
  if (clearButton) clearButton.addEventListener("click", clearSearch);

  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });

    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim();
      filterContacts(searchTerm);
    });
  }

      fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
        const headerContainer = document.getElementById("header-container");
        if (headerContainer) {
          headerContainer.innerHTML = data;

          const path = window.location.pathname;
        if (path.includes("index.html")) {
          document.getElementById("homeLink")?.classList.add("active");
        } else if (
          path.includes("about us.html") ||
          path.includes("about%20us.html")
        ) {
          document.getElementById("aboutLink")?.classList.add("active");
        } else if (path.includes("ClubsComs.html")) {
          document.getElementById("clubsComsLink")?.classList.add("active");
        } else if (path.includes("contact_repository.html")) {
          document
            .querySelector('a[href="contact_repository.html"]')
            ?.classList.add("active");
        } else if (path.includes("login.html")) {
          document.getElementById("loginLink")?.classList.add("active");
        }
      }
    })
    .catch((error) => console.error("Error fetching header:", error));
});
