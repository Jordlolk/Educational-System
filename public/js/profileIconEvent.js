let profileIcon = document.getElementById("profileIcon")
let floatingMenu = document.querySelector('[data-menu="menu"]')
let showMenu = false
let virtualElem;
profileIcon.addEventListener("click", (e) => {
  if(!showMenu){
    virtualElem = document.createElement('ul')
    virtualElem.classList.add("floatingMenu")
    virtualElem.innerHTML = `
    <li>
      <a href="../views/alterarDirecao.html">Alterar perfil</a>
    </li>
    <p></p>
    <li>
      <a href="../views/index.html">Sair</a>
    </li>`;
    floatingMenu.appendChild(virtualElem)
    showMenu = true
  floatingMenu.addEventListener('mouseleave', () => {
    floatingMenu.removeChild(virtualElem)
    showMenu = false
  })
  } else {
    showMenu = false
    floatingMenu.removeChild(virtualElem)
  }
})