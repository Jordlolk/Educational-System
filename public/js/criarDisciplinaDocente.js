import {errorAlert, showLogError} from '../js/globalFunctions.js'
const nomeDisciplina  = document.getElementById('nomeDisci')
const cpfDocente = document.getElementById('cpfDocentDisci')
console.log(cpfDocente.parentElement.children[1]);
const form = document.querySelector('.form')
function verifyData(){
  let validation = [
  {
    input: nomeDisciplina, 
    condicao: () => nomeDisciplina.value === '' || parseInt(nomeDisciplina.value) === NaN,
    error: 'Nome inválido ou contém números.'
  },
  {
    input: cpfDocente, 
    condicao: () => cpfDocente.value === '' || parseInt(cpfDocente.value) === NaN,
    error: 'CPF do docente inválido.'
  }
  ]
  validation.forEach((validations) => {
    console.log('aaaaaaaa');
    if(validations.condicao()){
      errorAlert(validations.input.parentElement.children[1], validations.error)
    }
  })
}

async function fetchBackEnd(dat){
  let data = dat
  try{
    let search = await fetch('http://localhost:3000/submit-form-register', (err,res) => {
        if(err){
          showLogError('Deu ruim')
        } else{
          showLogError('deu bom')
        }
    })
  } catch(e){
    console.log(e.message);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  verifyData()
 //fetchBackEnd({log: 'errro', data : ":"})
})