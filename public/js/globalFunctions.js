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
export {showLogError, errorAlert}