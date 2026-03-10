

window.getBasePath = window.getBasePath || function() {
    let path = window.location.pathname;
    if (path.includes('/CampusJiWeb/')) {
        path = path.split('/CampusJiWeb/')[1];
    }
    const parts = path.split('/').filter(p => p !== '' && !p.endsWith('.html'));
    return parts.length > 0 ? '../'.repeat(parts.length) : './';
};
var basePath = window.getBasePath();


document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = basePath;
    return;
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email.trim() === "" || password.trim() === "") {
        alert("Please fill in all fields.");
        return;
      }

      const userInfo = {
        email: email,
        loginTime: new Date().toISOString(),
        isLoggedIn: true,
      };

      if (email === "parceldude@gmail.com" && password === "parcel") {
        userInfo.permission = "parcel";
        userInfo.role = "parcel_service";
        userInfo.name = "Parcel Service";
      } else if (email === "admin.iimrohtak@gmail.com") {
        userInfo.permission = "admin";
        userInfo.role = "admin";
        userInfo.name = "Admin";
      } else {
        userInfo.permission = "user";
        userInfo.role = "student";
        userInfo.name = email.split("@")[0];
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      window.location.href = basePath;
    });
  }
});
