import {errorAlert, showLogError} from '../js/globalFunctions.js'
const NomeDisciplina = document.getElementById('nomeDisci')
const CpfDocente = document.getElementById('cpfDocentDisci')
const Form = document.querySelector('.form')
function verifyData(){
  let validation = [
  {
    input: NomeDisciplina, 
    condicao: () => NomeDisciplina.value === '' || parseInt(NomeDisciplina.value) === NaN,
    error: 'Nome inválido ou contém números.'
  },
  {
    input: CpfDocente, 
    condicao: () => CpfDocente.value === '' || parseInt(CpfDocente.value) === NaN,
    error: 'CPF do docente inválido.'
  }
  ]
  validation.forEach((validations) => {
    if(validations.condicao()){
      errorAlert(validations.input.parentElement.children[1], validations.error)
    }
  })
}

async function fetchBackEnd(info){
  try{
    let data = info
    let search = await fetch('http://localhost:3000/submit-form-disciplina', {
      method : "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(data)
    })
    /* let {resultOfBd} = await search.json()
    console.log(resultOfBd.join(', ')) */
    let response = await search.json()
    console.log(response);
    } catch(e){
    console.log(e.message)
  }
}

Form.addEventListener('submit', (e) => {
  e.preventDefault()
  verifyData()
  fetchBackEnd()
})