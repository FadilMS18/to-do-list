function makeAnElement(eleName, id = '' , group = ''){ // Make new element with id & class
    const element = document.createElement(eleName)
    element.setAttribute('id', id)
    element.setAttribute('class', group)

    return element
}

function appendMe(parent, ...children){ // Append 2 or more child
    children.forEach(child =>{
        parent.appendChild(child)
    })
}

function pushArray(parent, ...array){ // make New array with given child 
    array.forEach(arr =>{ parent.push(arr)})
}

function noTasksHeading(){ // Add heading if there is no tasks
    const h3 = makeAnElement('h3', 'no-task-heading')
    h3.style.textAlign = 'center'
    h3.textContent = "You Don't Have any task here yet"
    return h3
}

function bodyRemoveDial(){ 
    const body = document.body
    const dialogs = Array.from(document.querySelectorAll('#project-dialog'))
    dialogs[1].innerHTML = ''
    body.removeChild(dialogs[1])
}

function resetProjectDialog(element, name, desc){
    name.value = ''
    desc.value = ''
    let randomNumber = Math.floor(Math.random() * element.length)
    for(let i = 0; i < element.length; i++){
        element[i].classList.value = 'project-icon not-selected'
    }
    element[randomNumber].classList.value = 'project-icon selected'
}

export{ makeAnElement, appendMe, pushArray, noTasksHeading, bodyRemoveDial, resetProjectDialog}