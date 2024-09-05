
let form = document.querySelector('.form')
let username = document.getElementById("username")
let cpfInput = document.getElementById("cpfInput")
let emailInput = document.getElementById("emailInput")
let senhaInput = document.getElementById("senhaInput")
let confirmSenha = document.getElementById("confirmSenha")
let dataNasci = document.getElementById("datNascimento")
let buttonCapture = document.getElementById("capture") /* All the elements get from the HTML for the code */
let generatePassWord = document.querySelector(".gerarSenha")
let allInputs = [username,cpfInput,emailInput,senhaInput,dataNasci]
let count = 0
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  /* Verify e-mail */
console.log(mysql);
const validations = [
  {
    input : username,
    condicao: () =>  username.value === "" || username.value.length <= 2,
    error: "Insira um nome"
    },
  {
    input: cpfInput,
    condicao: () => cpfInput.value.length !== 14 || cpfInput.value === '',
    error: "CPF incorreto ou não inserido"
  },
  {
    input : emailInput,
    condicao: () => !regex.test(emailInput.value),
    error: "E-mail incorreto ou não inserido"
  },
  {
    input : senhaInput,
    condicao: () => senhaInput.value !== confirmSenha.value || senhaInput.value === '' || confirmSenha.value === '' || senhaInput === null,
    error: "Senhas não coincidem ou vazias"
  },
  {
    input: dataNasci,
    condicao: () => dataNasci.value === '' || dataNasci.value === null,
    error: "Insira uma data"
  }
];

let InputInUse = allInputs.filter((input,i) => {
  if(input !== null){
    console.log(input);
    return allInputs[i]
  }
})
let validationsInUse = validations.filter((validation, i) => {
  if(validation.input !== null){
    return validations[i]
  }
})

function errorAlert(input, string) {
  input.innerHTML = string;
  input.style.animation = "error 1.2s infinite";
  setTimeout(() => { input.style.animation = "none" }, 1200);
}
function createStudentPassW(){
  let password = Math.floor((Math.random() * 900000) + 100000)
  console.log(password);
  return password
}
generatePassWord.addEventListener('click', createStudentPassW)
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let isValid = true
  let errorElement = document.querySelectorAll('[data-js="error"]');
  validationsInUse.forEach((validation, i) => {
    // clear the error of the correct inputs
    errorElement[i].innerHTML = ''
    if (validation.condicao()) {
        errorAlert(validation.input.parentElement.children[1], validation.error)
        isValid = false;
    }
});
  
  if(allInputs[allInputs.length-1] === null){
    if(!isValid){
      return; /* Stop the code. */
    }
    const DIRETOR_DATA = {
      username : username.value,
      cpf : cpfInput.value,
      email : emailInput.value,
      senha : senhaInput.value
    }
    localStorage.setItem('REGISTER_Diretor' , JSON.stringify(DIRETOR_DATA))
    window.alert('Data Saved!')
  } else{
    if(!isValid){
      return; /* Stop the code. */
    }
    const ALUNO_DATA = {
      username : username.value,
      cpf : cpfInput.value,
      email : emailInput.value,
      data : dataNasci.value
    }
    localStorage.setItem('REGISTER_Diretor' , JSON.stringify(ALUNO_DATA))
    window.alert('Data Saved!') 
  }
 
  errorElement.forEach((p) => {
    p.innerHTML = ""
  })
})


