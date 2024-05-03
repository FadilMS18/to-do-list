import { editImage, readImage, deleteImage, finishImage } from "./svg"
import { makeAnElement, appendMe, editTask, projects } from "./newProject"
import { differenceInCalendarDays, format } from "date-fns"

let body = document.body
let today = new Date()

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

function newTaskDOM(taskTitle, dueTo, dif, finishStatus){
    const taskContainer = makeAnElement('div', '', 'tasks')

    const difMeter = makeAnElement('span', 'dif-meter')

    const title = makeAnElement('p', 'task-name')
    title.textContent = taskTitle

    const buttonContainer = makeAnElement('div', 'button-container')
    
    const date = makeAnElement('p', 'date')
    date.textContent = format(dueTo, 'dd-MM-yyyy')
    let daysDif = differenceInCalendarDays(dueTo, new Date())
    dateRange(date, daysDif)

    const finish = makeAnElement('img', 'finish-task')
    finish.src = finishImage

    const edit = makeAnElement('img', 'edit-task')
    edit.src = editImage
   
    const read = makeAnElement('img', 'read-task')
    read.src = readImage
 
    const erase = makeAnElement('img', 'delete-task')
    erase.src = deleteImage
 
    appendMe(buttonContainer, date, finish, edit, read, erase)
    appendMe(taskContainer, difMeter, title, buttonContainer)

    diffMeterValue(difMeter, dif, finishStatus)

    return taskContainer

}
    
function diffMeterValue(ele, meter, finishStatus){
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
    if(finishStatus){
        ele.classList.add('complete')
        ele.parentNode.classList.add('complete')
    }else{
        ele.classList.remove('complete')
        ele.parentNode.classList.remove('complete')
    }
}

function dateRange(ele, comparison){
    if(comparison < 0){
        ele.classList.value = 'past-day'
    }else if(comparison >= 0 && comparison <= 1){
        ele.classList.value = 'deadline'
    }else if(comparison >= 2 && comparison <= 7){
        ele.classList.value = 'one-week'
    }else { ele.classList.value = 'more-than-a-week' }
}

export {makeAContent, newTaskDOM, bodyRemoveDial, diffMeterValue, dateRange}