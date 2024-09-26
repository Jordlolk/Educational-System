import { errorAlert, filterValidations, showLogError } from "./globalFunctions.js"

const username = document.getElementById('username')
const cpfInput = document.getElementById('cpfInput')
const passWord = document.getElementById('senhaInput')
let photo = document.getElementById('photo')
const inputs = document.querySelectorAll('input')
const login = document.getElementById('login')

login.addEventListener('submit', (e) => {
  e.preventDefault()
  let isValid = true
  /* filterValidations().forEach((validation) => {
      if(validation.condicao()){
        errorAlert(validation.input.parentElement.children[1], validation.error)
        isValid = false  
      }
  })
  if(isValid){
    return 
  } */
  photo.value =  photo.value.length > 0 ? '../imgs/perfilIcon.png' : photo.value
  const accountLoggedIn = {
    nome : username.value,
    cpfInput: cpfInput.value,
    passWord: passWord.value,
    photo : photo.v
  }
  fetchBackEnd(accountLoggedIn)
})

