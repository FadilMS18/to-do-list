import './css/style.css'
import { x as mar, addProjectContent } from './js/first'


console.log('hello, world!')

console.log('hay')

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
const body = document.querySelector('body')

function makeSideBar(){
    const side = document.createElement('aside')
    side.classList.add('sidebar')
    const h3 = document.createElement('h3')
    h3.textContent = 'halo'
    side.appendChild(h3)

    return side
}

// body.appendChild(makeNavbar())
// body.appendChild(makeSideBar())
console.log('hello, world')

document.querySelector('#dark-button-container').addEventListener('click', ()=>{
    let ball = document.querySelector('#ball')    
    ball.classList.contains('translate-right') ? ball.classList.remove('translate-right') 
    : ball.classList.add('translate-right')
})

const addNewProject = document.querySelector('#add-new-project')

addNewProject.addEventListener('click', ()=>{
    const projectContainer = document.querySelector('#projects-container')
    projectContainer.appendChild(addProjectContent())
})