import { editImage, readImage, deleteImage } from "./svg"

const tasks = Array.from(document.querySelectorAll('.tasks'))
let body = document.body

function newTask(){
    const dial = makeDialog()
    const content = makeAContent('', '', false)
    dial.appendChild(content.container)
    body.appendChild(dial)
    dial.showModal()
    

    content.container.addEventListener('submit', (e)=>{
        e.preventDefault()
        let centerMain = document.getElementById('center-main')
        if(document.getElementById('no-task-heading')){ centerMain.removeChild(document.getElementById('no-task-heading'))}

        const title = content.container.querySelector('#project-name')
        centerMain.appendChild(newTaskDOM(title.value))
        tasks.push(newTaskDOM(title.value))
        if(tasks.length >= 3){ centerMain.classList.add('scroll')}
        dial.close()
        setTimeout(bodyRemoveDial, 501)
        
    })
}

function makeDialog(){
    const dial = document.createElement('dialog')
    dial.setAttribute('id' ,'project-dialog')

    return dial
}


function makeAContent(name, desc, read = true){
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

    if(read){
        _input.readOnly = true
        _description.readOnly = true
        _h2.textContent = 'Task Read'
    }else{ _h2.textContent = 'Task Edit' }

    const _button = document.createElement('button')
    _button.textContent = 'Confirm'
    _button.setAttribute('type', 'submit')
    _button.setAttribute('id', 'project-confirm')

    _form.appendChild(_h2)
    _form.appendChild(_input)
    _form.appendChild(_description)
    _form.appendChild(_button)

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

function newTaskDOM(taskTitle, dueTo = '2024-20-12'){
    const taskContainer = document.createElement('div')
    taskContainer.classList.add('tasks')

    const title = document.createElement('p')
    title.setAttribute('id', 'task-name')
    title.textContent = taskTitle

    const buttonContainer = document.createElement('div')
    buttonContainer.setAttribute('id', 'button-container')
    
    const date = document.createElement('p')
    date.textContent = dueTo

    const edit = document.createElement('img')
    edit.setAttribute('id', 'edit-task')
    edit.src = editImage
   
    const read = document.createElement('img')
    read.setAttribute('id', 'read-task')
    read.src = readImage
 
    const erase = document.createElement('img')
    erase.setAttribute('id', 'delete-task')
    erase.src = deleteImage
 
    buttonContainer.appendChild(date)
    buttonContainer.appendChild(edit)
    buttonContainer.appendChild(read)
    buttonContainer.appendChild(erase)

    taskContainer.appendChild(title)
    taskContainer.appendChild(buttonContainer)

    edit.addEventListener('click', ()=>{
        let task = edit.parentNode.parentNode
        let taskName = task.querySelector('#task-name')
        let content = makeAContent(taskName.textContent, 'testing here', false)
        const dial = makeDialog()
        dial.appendChild(content.container)
        body.appendChild(dial)
        dial.showModal()

        content.container.addEventListener('submit', (e)=>{
            e.preventDefault()
            taskName.textContent = content.title.value
            dial.close()
            setTimeout(bodyRemoveDial, 501)
        })        
    })

    read.addEventListener('click', ()=>{
        let task = read.parentNode.parentNode
        let taskName = task.querySelector('#task-name')
        let content = makeAContent(taskName.textContent, 'testing here', true)
        const dial = makeDialog()
        dial.appendChild(content.container)
        body.appendChild(dial)
        dial.showModal()

        content.container.addEventListener('submit', (e)=>{
            e.preventDefault()
            taskName.textContent = content.title.value
            dial.close()
            setTimeout(bodyRemoveDial, 501)
        })        
    })

    erase.addEventListener('click', ()=>{
        let task = erase.parentNode.parentNode
        task.classList.add('erase')
        setTimeout(()=>{
            document.querySelector('#center-main').removeChild(task)
        },401)
        
        
    })

    return taskContainer

}
    
tasks.forEach(task =>{
    let para = task.querySelector('#task-name') 
    const edit = task.querySelector('#edit-task')
    const read = task.querySelector('#read-task')
    
    const dial = makeDialog()

    edit.addEventListener('click', ()=>{
        let content = makeAContent(para.textContent, 'testing edit button', false)
        body.appendChild(dial)
        dial.appendChild(content.container)
        dial.showModal()
            
        content.container.addEventListener('submit', (e)=>{
            e.preventDefault()
            para.textContent = content.title.value
            dial.close()
            setTimeout(bodyRemoveDial ,501)    
        })            
    })

    read.addEventListener('click', ()=>{
        let content = makeAContent(para.textContent, 'testing edit button')
        body.appendChild(dial)
        dial.appendChild(content.container)
        dial.showModal()
            
        content.container.addEventListener('submit', (e)=>{
            e.preventDefault()
            para.textContent = content.title.value
            dial.close()
            setTimeout(bodyRemoveDial ,501)    
        })
    })
})

export {tasks, newTask}