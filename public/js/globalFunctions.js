
function showLogError(message){
  const contentLogError = document.getElementById('errors')
  const asideInfos = document.querySelector('.asideInfos')
  const closeLog = document.querySelector('.close')
  let sucess = message.includes('sucesso') || message.includes('inserido')
  asideInfos.style.animation = 'showError 800ms ease-out forwards'
  if(sucess){
    asideInfos.style.backgroundColor = 'rgba(0, 100, 0, 0.951)'
    contentLogError.innerText = message
    return
  }
  asideInfos.style.backgroundColor = 'rgba(154, 13, 13, 0.951)'
  contentLogError.innerText = message
  closeLog.addEventListener('click', () => {
    asideInfos.style.animation = 'closeError 800ms ease-out forwards'
  })
}
function errorAlert(input, string) {
  input.innerHTML = string;
  input.style.animation = "error 1.2s infinite";
  setTimeout(() => { input.style.animation = "none" }, 1200);
}

function filterValidations(){
  const username = document.getElementById("username") 
  const cpfInput = document.getElementById("cpfInput")
  const emailInput = document.getElementById("emailInput")
  const senhaInput = document.getElementById("senhaInput")
  const photo = document.getElementById('photo')
  let confirmSenha = document.getElementById("confirmSenha")
  const dataNasci = document.getElementById("datNascimento")
  if(confirmSenha === null){
    confirmSenha = {
      input : senhaInput,
      condicao: () => senhaInput.value === '' || confirmSenha.value === '' || senhaInput === null,
      error: "Senhas não coincidem ou vazias"
    }
  }
  const regexLinks = /^(hhtps:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)$/
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  /* Verify e-mail */
  const validations = [
    {
      input : username,
      condicao: () =>  username.value === "" || username.value.length <= 2,
      error: "Insira um nome"
    },
    {
      input: cpfInput,
      condicao: () => parseInt(cpfInput.value) === NaN || cpfInput.value === '',
      error: "CPF incorreto ou não inserido"
    },
    {
      input : emailInput,
      condicao: () => !regexEmail.test(emailInput.value),
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
    },
    {
      input: photo,
      condicao: () => regexLinks.test(photo.value) || photo.value.length > 0,
      error: "Link no formato errado!"
    }
  ];
  let validationsInUse = validations.filter((validation, i) => {
    if(validation.input !== null){
      return validations[i]
    }
  })
  return validationsInUse;
}

function verifylogin(){
  let inputText = 'text'
}
export {showLogError, errorAlert, filterValidations}