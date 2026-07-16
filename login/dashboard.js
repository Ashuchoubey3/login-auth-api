// ------------------------
// Show Login Form
// ------------------------

function showLogin() {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("signupBox").style.display = "none";
}

// ------------------------
// Show Signup Form
// ------------------------

function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

// ------------------------
// Login
// ------------------------

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful");
        console.log(data);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot reach server. Open http://localhost:3000 and make sure the server is running.");
    }
  });

// ------------------------
// Signup
// ------------------------

document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup Successful");

        showLogin();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Cannot reach server. Open http://localhost:3000 and make sure the server is running.");
    }
  });
