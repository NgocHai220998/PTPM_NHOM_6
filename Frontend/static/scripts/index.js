window.addEventListener('DOMContentLoaded', (event) => {
  const windowHieght = window.innerHeight
  // console.log(window.innerHeight)
  const chatBox = document.getElementsByClassName('sidebar-left-chatbox')[0]
  const chatBoxContent = document.getElementsByClassName('chatbox-content')[0]
  chatBox.style.height = (windowHieght - 335) + 'px'
  chatBoxContent.style.height = windowHieght - 330 - 65 + 'px'


  const sidebarKanji = document.getElementsByClassName('sidebar-right-bot')[0]
  sidebarKanji.style.height = (windowHieght - 430) + 'px'
})
