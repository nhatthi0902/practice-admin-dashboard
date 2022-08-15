const asideMenu = document.querySelector('aside')
const menuBtn = document.querySelector('#menu-btn')
const closeBtn = document.querySelector('#close-btn')

menuBtn.addEventListener('click',function(){
    console.log('menu btn')
    asideMenu.style.display = 'block'
})

closeBtn.addEventListener('click', function(){
    asideMenu.style.display = 'none'
})