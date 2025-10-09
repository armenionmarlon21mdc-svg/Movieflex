document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Reset error messages
  emailError.style.display = "none";
  passwordError.style.display = "none";
  emailInput.classList.remove("error");
  passwordInput.classList.remove("error");

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // Patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobilePattern = /^[0-9]{10,}$/;

  let isValid = true;

  // ✅ Email or phone validation
  if (!emailPattern.test(emailValue) && !mobilePattern.test(emailValue)) {
    emailError.textContent = "Please enter a valid email or mobile number.";
    emailError.style.display = "block";
    emailInput.classList.add("error");
    isValid = false;
  }

  // ✅ Password validation
  if (passwordValue.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
    isValid = false;
  }

  // ✅ If all good, redirect
  if (isValid) {
    window.location.href = "subscription.html";
  }
});
