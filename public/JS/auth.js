const loginFunc = async (email, password) => {
  try {
    console.log("login", password, email);

    const loginAwait = await fetch(
      "http://localhost:8000/api/v1/author/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      }
    );
    const loginData = await loginAwait.json();

    console.log("loginData =>", loginData);

    if (loginData.status === "success") {
      alert("Login successful");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    } else {
      alert("Login failed");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const signUpFunc = async (...data) => {
  try {
    const [fullName, email, password, passwordConfirm] = data;
    console.log("signUp=> ", fullName, email, password, passwordConfirm);

    const signUpAwait = await fetch(
      "http://localhost:8000/api/v1/author/signUp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, passwordConfirm }),
      }
    );
    const signUpData = await signUpAwait.json();

    console.log("signUpData =>", signUpData);

    if (signUpData.status === "success") {
      alert("signUp successful");
    } else {
      alert(signUpData.message);
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const login = document.querySelector(".login");

if (login) {
  login.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("login", password, email);
    loginFunc(email, password);
  });
}

const signUp = document.querySelector(".signUp");

if (signUp) {
  signUp.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    console.log(fullName, email, password, passwordConfirm);

    signUpFunc(fullName, email, password, passwordConfirm);
  });
}
