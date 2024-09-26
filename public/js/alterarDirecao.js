import {showLogError} from "./globalFunctions.js"

let form = document.querySelector('.form')
let username = document.getElementById("username")
let cpfInput = document.getElementById("cpfInput")
let alterarDIR = document.getElementById('capture')
let InputInUse = document.querySelectorAll('input')
function checkInputs() {
  let allFilled = true;
  let firstInp = InputInUse[0].value.length
  let lastInp = InputInUse[1].value.length
  InputInUse.forEach(input => {
    if (input.value === '' || firstInp < 2 || lastInp !== 11) {
      allFilled = false;
    }
  });
  if (allFilled) {
    alterarDIR.style.opacity = '1';
    alterarDIR.disabled = false;
    alterarDIR.style.cursor = 'pointer'
  } else {
    alterarDIR.style.opacity = '0.5';
    alterarDIR.disabled = true;
    alterarDIR.style.cursor = 'no-drop'
  }
};
InputInUse.forEach((input) => {
  input.addEventListener('input', checkInputs)
})
checkInputs()

async function fetchBackEnd(data){
  try {
      const bodyData = {...data}
      const response = await fetch('http://localhost:3000/submit-form-register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyData)
      });
      const result = await response.json();
      showLogError(result.message)
  } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
  }
}
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  alterarDIR.classList.add('buttonClickEff')
  setTimeout(() => {alterarDIR.classList.remove('buttonClickEff')}, 400)  
  const dirUpdate = {
    nome : username.value,
    cpf : cpfInput.value,
  }
  fetchBackEnd(dirUpdate)
})
