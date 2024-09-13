import {showLogError, errorAlert} from "./globalFunctions.js"
const form = document.querySelector('.form')
const username = document.getElementById("username") 
const cpfInput = document.getElementById("cpfInput")
const buttonCapture = document.getElementById("capture")
const emailInput = document.getElementById("emailInput")
const senhaInput = document.getElementById("senhaInput")
const confirmSenha = document.getElementById("confirmSenha")
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
} else{
   genPassButton = null
   genPassText = null
}

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  /* Verify e-mail */
const validations = [
  {
    input : username,
    condicao: () =>  username.value === "" || username.value.length <= 2,
    error: "Insira um nome"
    },
  {
    input: cpfInput,
    condicao: () => cpfInput.value.length !== 11 || cpfInput.value === '',
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
let validationsInUse = validations.filter((validation, i) => {
  if(validation.input !== null){
    return validations[i]
  }
})

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
