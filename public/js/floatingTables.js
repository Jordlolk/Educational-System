let tableAlunos = document.getElementById("tableAlunos")
let dataALUNOS = document.getElementById("dataALUNOS")
let tableDocentes = document.getElementById("tableDocentes")
let buttonsAlterar = document.querySelectorAll(".btn-alterar")
let buttonsExcluir = document.querySelector(".btn-excluir")
let exitTableDocente = document.getElementById("exitTableDocente")
let exitTableAlunos = document.getElementById("exitTableAluno")
let verDocente = document.getElementById("openDocente")
let verAlunos = document.getElementById("openAlunos")

verDocente.addEventListener('click' , () => {

  tableDocentes.style.display = "block"
  exitTableDocente.addEventListener('click' , () => {
    tableDocentes.style.display = "none"
  })
    tableDocentes.scrollIntoView({behavior : "instant"})
})

verAlunos.addEventListener('click' , () => {

  tableAlunos.style.display = "block"
  exitTableAlunos.addEventListener('click' , () => {
    tableAlunos.style.display = "none"
  })
    tableAlunos.scrollIntoView({behavior : "instant"})
})

let ids = 0
const populateTable = () => {
  ALUNOS.forEach((alunos, id) => {
    let ids = id
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${alunos.nome}</td>
      <td>${alunos.nasc}</td>
      <td>${alunos.cpf}</td>
      <td>
          <button id="${ids}" class="btn-alterarJs" data-change = "aluno">Alterar</button>
          <button class="btn-excluirJs">Excluir</button>
          </td> 
    `
    dataALUNOS.appendChild(tr)
  })
}
document.addEventListener('DOMContentLoaded', populateTable())

const changeAluno = document.querySelectorAll('[data-change = "aluno"]')
changeAluno.forEach((button) => {
  button.addEventListener('click' , (eve) => {
    let numberId = parseInt(eve.target.id)
    aux[numberId].nome = window.prompt("Novo nome do aluno: ")
  })
})
