import { editImage, readImage, deleteImage } from "./svg"
import { makeAnElement, appendMe, editTask, projects } from "./newProject"
import { format } from "date-fns"

const tasks = Array.from(document.querySelectorAll('.tasks'))
let body = document.body

let manyTask = []


// function newTask(){
//     const dial = makeDialog()
//     const content = makeAContent('', '', false)
//     dial.appendChild(content.container)
//     body.appendChild(dial)
//     dial.showModal()

//     content.container.addEventListener('submit', (e)=>{
//         e.preventDefault()
//         let centerMain = document.getElementById('center-main')
//         if(document.getElementById('no-task-heading')){ centerMain.removeChild(document.getElementById('no-task-heading'))}

//         const title = content.container.querySelector('#project-name')
//         centerMain.appendChild(newTaskDOM(title.value))
//         tasks.push(newTaskDOM(title.value))
//         if(tasks.length >= 3){ centerMain.classList.add('scroll')}
//         dial.close()
//         setTimeout(bodyRemoveDial, 501)
//     })
// }

function makeDialog(){
    const dial = document.createElement('dialog')
    dial.setAttribute('id' ,'project-dialog')

    return dial
}


function makeAContent(name, desc, dueTo, option = 'easy', read = true){
    const _form = document.createElement('form')
    _form.setAttribute('id', 'project-form') 

    const _h2 = document.createElement('h2')

    const _input = document.createElement('input') 
    _input.setAttribute('id', 'project-name')
    _input.setAttribute('autocomplete', 'off')
    _input.setAttribute('placeholder', 'Task Name')
    _input.value = name
    _input.required = true
    _input.maxLength = 16

    const _description = document.createElement('textarea')
    _description.setAttribute('cols', '30')
    _description.setAttribute('rows', '10')
    _description.setAttribute('id', 'project-description')
    _description.setAttribute('autocomplete', 'off')
    _description.setAttribute('placeholder', 'Task Description')
    _description.value = desc

    const _dateDue = makeAnElement('input', 'date-input')
    _dateDue.setAttribute('type', 'date')
    _dateDue.required = true
    _dateDue.value = dueTo

    const _select = makeAnElement('select', 'select-dif')
    const opt1 = makeAnElement('option')
    opt1.setAttribute('value', 'easy')
    opt1.textContent = '-- Select the priority --'

    const opt2 = makeAnElement('option')
    opt2.setAttribute('value', 'hard')
    opt2.textContent = 'Important'

    const opt3 = makeAnElement('option')
    opt3.setAttribute('value', 'medium')
    opt3.textContent = 'Not That Important'

    const opt4 = makeAnElement('option')
    opt4.setAttribute('value', 'easy')
    opt4.textContent = 'Optional'
    appendMe(_select, opt1, opt2, opt3, opt4)
    _select.value = option

    if(read === 'read'){
        _input.readOnly = true
        _description.readOnly = true
        _dateDue.readOnly = true
        _select.disabled = true
        _h2.textContent = 'Task Read'
    }else if(read === 'edit'){
        _h2.textContent = 'Task Edit' 
    }else{_h2.textContent = 'New Task'}

    const _button = document.createElement('button')
    _button.textContent = 'Confirm'
    _button.setAttribute('type', 'submit')
    _button.setAttribute('id', 'project-confirm')

    appendMe(_form, _h2, _input, _description, _dateDue, _select,  _button)

    return {
        get container(){
            return _form
        },
        get legend(){
            return _h2
        },
        get title(){
            return _input
        },
        get script(){
            return _description
        },
        get dateDue(){
            return _dateDue
        },
        get difficulty(){
            return _select
        },
        get button(){
            return _button
        }
    }
}

function bodyRemoveDial(){
    const dialogs = Array.from(document.querySelectorAll('#project-dialog'))
    dialogs[1].innerHTML = ''
    body.removeChild(dialogs[1])
}

function newTaskDOM(taskTitle, dueTo, dif){
    const taskContainer = makeAnElement('div', '', 'tasks')

    const difMeter = makeAnElement('span', 'dif-meter')
    diffMeterValue(difMeter, dif)


    const title = makeAnElement('p', 'task-name')
    title.textContent = taskTitle

    const buttonContainer = makeAnElement('div', 'button-container')
    
    const date = makeAnElement('p', 'date')
    date.textContent = format(dueTo, 'dd-MM-yyyy')

    const edit = makeAnElement('img', 'edit-task')
    edit.src = editImage
   
    const read = makeAnElement('img', 'read-task')
    read.src = readImage
 
    const erase = makeAnElement('img', 'delete-task')
    erase.src = deleteImage
 
    appendMe(buttonContainer, date, edit, read, erase)
    appendMe(taskContainer, difMeter, title, buttonContainer)

    return taskContainer

}
    
function diffMeterValue(ele, meter){
    switch (meter){
        case 'easy':
            ele.classList.value = 'easy'
            break;
        case 'medium':
            ele.classList.value = 'medium'
            break;
        case 'hard':
            ele.classList.value = 'hard'
            break;    
        default:
            break;
    }
}


export {tasks,  makeAContent, newTaskDOM, bodyRemoveDial, diffMeterValue}