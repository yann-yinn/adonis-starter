const pwToggleBtn = document.getElementById('togglePassword');
const pwInput = document.getElementById('password');

pwToggleBtn.addEventListener("click", function(){
  const type = pwInput.getAttribute("type") === "password"? "text": "password";
  pwInput.setAttribute("type", type);
  this.classList.toggle('bi-eye');
});