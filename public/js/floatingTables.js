let tableAlunos = document.getElementById("tableAlunos")
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