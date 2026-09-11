let form = document.querySelector("#form");
let password = document.querySelector("#password");
let username = document.querySelector("#name");
let email = document.querySelector("#email");
let error = document.querySelector("#error");
form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (username.value.trim().length == 0) {
             error.classList.remove("green")
             error.classList.add("red")
            error.textContent = "Name cann't be empty"
            return
      }
      else if (email.value.trim().length == 0) {
             error.classList.remove("green")
             error.classList.add("red")
            error.textContent = "Email cann't be empty"
            return
      }
      else if (password.value.trim().length < 6) {
            error.classList.remove("green")
             error.classList.add("red")
            error.textContent = "password has atleast 6 characters"
            return
      }
      else{
             error.classList.remove("red")
            error.classList.add("green")
            error.textContent="Form submitted succesfully"
      }
})
password.addEventListener("focus", (e) => {
      password.classList.add("newBorder");
})
password.addEventListener("blur", (e) => {
      password.classList.remove("newBorder");
})


