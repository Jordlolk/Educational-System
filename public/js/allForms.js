import {showLogError, errorAlert, filterValidations} from "./globalFunctions.js"
const form = document.querySelector('.form')
const username = document.getElementById("username") 
const cpfInput = document.getElementById("cpfInput")
const buttonCapture = document.getElementById("capture")
const emailInput = document.getElementById("emailInput")
const senhaInput = document.getElementById("senhaInput")
const dataNasci = document.getElementById("datNascimento")
let allInputs = [username,cpfInput,emailInput,senhaInput,dataNasci]
/*Lines 1-9: All this variables is present in all HTML pages that have inputs.
all the pages have a standards classes.*/
let genPassText, genPassButton;
const genPassWordContent = document.querySelector('.gerarSenha')
let password = false
if(genPassWordContent && genPassWordContent.children.length > 0){
   genPassText = document.querySelector(".gerarSenha").children[0]
   genPassButton = document.querySelector(".gerarSenha").children[1]

   const createPassWord = (e) => {
    e.preventDefault()
    genPassButton.classList.add('buttonClickEff')
    setTimeout(() => { genPassButton.classList.remove('buttonClickEff')}, 400)
    password = Math.floor((Math.random() * 900000) + 100000);
    password > 0? genPassText.innerHTML = "Senha gerada ❗" : null
  }

  genPassButton.addEventListener('click' , createPassWord)
  function checkInputs() {
    let allFilled = true;
    InputInUse.forEach(input => {
      if (input.value === '') {
        allFilled = false;
      }
    });
    if (allFilled) {
      genPassText.innerHTML = "Gere a senha ❗";
      genPassButton.style.opacity = '1';
      genPassButton.disabled = false;
      genPassButton.style.cursor = 'pointer'
    } else {
      genPassText.innerHTML = "Insira os dados";
      genPassButton.style.opacity = '0.5';
      genPassButton.disabled = true;
      genPassButton.style.cursor = 'no-drop'
    }
  }
  let InputInUse = allInputs.filter((input,i) => {
    if(input !== null){
      input.addEventListener('input', checkInputs)
      return allInputs[i]
    }
  })
  checkInputs()
}
else{
   genPassButton = null
   genPassText = null
}

async function fetchBackEnd(data) {
  try {
      const bodyData = {...data}
      const response = await fetch('http://localhost:3000/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyData)
      });
      const result = await response.json(); 
      showLogError(result.message)
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}

//Cadastro: Diretor e Aluno
let countAluno = 0;
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  let errorElement = document.querySelectorAll('[data-js="error"]');
  buttonCapture.classList.add('buttonClickEff')
  setTimeout(() => {buttonCapture.classList.remove('buttonClickEff')}, 400)
  let isValid = true
  filterValidations().forEach((validation, i) => {
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
      nome : username.value,
      cpf : cpfInput.value,/* REVISAR OS DADOS DE ALUNOS E PROFESSORES */
      senha : senhaInput.value,
      tipo: 'diretor'
    }
    fetchBackEnd(DIRETOR_DATA)
  } else{
    if(!isValid || !password){
      genPassText.innerHTML = "Gere uma senha ❗";
      return; /* Stop the code. */
    }
    const ALUNO_DATA = {
      nome : username.value,
      cpf : cpfInput.value,
      email : emailInput.value,
      senha: password,
      nasci : dataNasci.value,
      tipo : 'aluno'
    }
    localStorage.setItem(`ALUNO_DATA${countAluno}`, JSON.stringify(ALUNO_DATA))
    countAluno += 1
    fetchBackEnd(ALUNO_DATA)
  }
  errorElement.forEach((p) => {
    p.innerHTML = ""
  })
})
