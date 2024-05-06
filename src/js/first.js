import { format } from 'date-fns'
import {manySvg as svg} from './svg'

function pickRandomImg(){
    return svg[Math.floor(Math.random() * svg.length)]
}

const todayDateReminder = document.querySelector('#today-date > span') 
todayDateReminder.innerHTML = format(new Date(), 'EEE dd MMMM yyyy')

function addProjectContent(title){
    const div = document.createElement('div')
    div.classList.add('project-content')

    const img = document.createElement('img')
    img.setAttribute('src', pickRandomImg())
    div.appendChild(img)

    const h4 = document.createElement('h4')
    h4.textContent = title
    div.appendChild(h4)

    return div
}

export let x = 'this is from first.js'
export { addProjectContent }
