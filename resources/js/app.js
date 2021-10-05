import '../css/app.css'

const pwToggleBtn = document.getElementById('togglePassword');
const pwToggleConfirmBtn = document.getElementById('togglePasswordConfirm');
const pwInput = document.getElementById('password');
const pwConfirmInput = document.getElementById('password-confirm');

if (pwInput) {
  const togglePassword = function(){
    const type = pwInput.getAttribute("type") === "password"? "text": "password";
    pwInput.setAttribute("type", type);
    this.classList.toggle('bi-eye');
  }
  pwToggleBtn.addEventListener("click", togglePassword);
}

if (pwConfirmInput) {
  const togglePasswordConfirm = function(){
    const type = pwConfirmInput.getAttribute("type") === "password"? "text": "password";
    pwConfirmInput.setAttribute("type", type);
    this.classList.toggle('bi-eye');
  }
  pwToggleConfirmBtn.addEventListener("click", togglePasswordConfirm);
}