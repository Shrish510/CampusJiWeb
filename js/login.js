document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "main.html";
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
      } else {
        userInfo.permission = "user";
        userInfo.role = "student";
        userInfo.name = email.split("@")[0];
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      window.location.href = "main.html";
    });
  }
});
