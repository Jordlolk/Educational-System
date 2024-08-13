let nome = document.getElementById("name")
let cpf = document.getElementById("cpf")
let data = document.getElementById("data")
let email = document.getElementById("email")

let oldPassW = document.getElementById("oldPassW")
let newPassW = document.getElementById("newPassW")
let confirmPassW = document.getElementById("confirmPass")

let alterarPass = document.getElementById("alterarPass")
let passWordInputs = document.getElementById("passwordsDiv")
let toggle = false
alterarPass.addEventListener("click", (event) => {
  event.preventDefault()
  if(toggle === false){
    passWordInputs.classList.add("show")
    toggle = true
    return
  } else {
    passWordInputs.classList.remove("show")
    toggle = false
  }
})