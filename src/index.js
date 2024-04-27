import './css/style.css'
import './css/dialog.css'
import './css/main.css'
import { x as mar } from './js/first'
import { projectModal } from './js/newProject'
import { tasks, newTask } from './js/taskEdit'

const body = document.body

console.log(mar)

function makeNavbar(){
    const nav = document.createElement('nav')
    nav.classList.add('nav')

    const h1 = document.createElement('h1')
    h1.innerHTML = 'To-Do-List'
    nav.appendChild(h1)

    const div = document.createElement('div')
    div.classList.add('nav-right-section')

    const button = document.createElement('button')
    button.textContent = 'Dark Mode'
    button.setAttribute('id', 'dark-button')

    const p = document.createElement('p')
    p.textContent = new Date('2024', '03', '17', new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())

    div.appendChild(button)
    div.appendChild(p)
    nav.appendChild(div)
    
    return nav
}


function makeSideBar(){
    const side = document.createElement('aside')
    side.classList.add('sidebar')
    const h3 = document.createElement('h3')
    h3.textContent = 'halo'
    side.appendChild(h3)

    return side
}

// Dark Button 
document.querySelector('#dark-button-container').addEventListener('click', ()=>{
    let ball = document.querySelector('#ball')    
    ball.classList.contains('translate-right') ? ball.classList.remove('translate-right') 
    : ball.classList.add('translate-right')
})

// Sidebar left & right
const sideBarOpener = document.querySelector('#sidebar-opener')

sideBarOpener.addEventListener('click', ()=>{
    if(!sideBarOpener.classList.contains('sidebar-close')){
        const sidebar = document.querySelector('#sidebar')
        sidebar.classList.add('sidebar-container-close')
        sideBarOpener.classList.add('sidebar-close')
        document.getElementById('main-container').classList.add('go-left')
    }else{
        const sidebar = document.querySelector('#sidebar')
        sidebar.classList.remove('sidebar-container-close')
        sideBarOpener.classList.remove('sidebar-close')
        document.getElementById('main-container').classList.remove('go-left')
    }
})

// Add New project modal
const addNewProject = document.querySelector('#add-new-project')
addNewProject.addEventListener('click', projectModal)



//  tasks for edit read and delete,add new task
// const newTaskButton = document.getElementById('new-task-button')
// newTaskButton.addEventListener('click', newTask)