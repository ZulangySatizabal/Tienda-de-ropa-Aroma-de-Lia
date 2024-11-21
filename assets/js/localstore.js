class LocalStorageHandler {
  // Método para registrar al usuario
  static registerUser(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return false;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Cuenta creada con éxito");
    return true;
  }

  // Método para iniciar sesión
  static loginUser(email, password) {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Inicio de sesión exitoso");
      return true;
    } else {
      alert("Correo o contraseña incorrectos");
      return false;
    }
  }
}

// Manejo del registro
document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  const success = LocalStorageHandler.registerUser(name, email, password, confirmPassword);
  if (success) {
    window.location.href = "login.html"; // Redirige al login después del registro
  }
});

// Manejo del inicio de sesión
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const success = LocalStorageHandler.loginUser(email, password);
  if (success) {
    window.location.href = "index.html"; // Redirige al index si el login es exitoso
  }
});
