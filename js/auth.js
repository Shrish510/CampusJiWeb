document.addEventListener("DOMContentLoaded", function () {
  const protectedPages = ["parcel-hub.html", "grievance.html", "lost-and-found.html"];
  const currentPage = window.location.pathname.split("/").pop();

  const isProtected = protectedPages.includes(currentPage);

  if (localStorage.getItem("isLoggedIn") !== "true" && isProtected) {
    window.location.href = "/login/";
    return;
  }
});
