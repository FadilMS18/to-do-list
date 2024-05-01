import {manySvg as svg} from './svg'
export let x = 'this is from first.js'


function pickRandomImg(){
    return svg[Math.floor(Math.random() * svg.length)]
}


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

export { addProjectContent }
