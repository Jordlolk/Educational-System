
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
  const confirmSenha = document.getElementById("confirmSenha")
  const dataNasci = document.getElementById("datNascimento")

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  /* Verify e-mail */
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
  return validationsInUse;
}

export {showLogError, errorAlert, filterValidations}