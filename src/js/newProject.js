import { addProjectContent } from "./first"
import { donutCat as cat } from "./svg"
import { makeAContent, newTaskDOM, manyTask, bodyRemoveDial, diffMeterValue } from "./taskEdit"
import { format } from "date-fns"


const projectDialog = document.querySelector('#project-dialog')

const form = document.querySelector('#project-form')
const projectName = document.querySelector('#project-name')
const projectDescription = document.querySelector('#project-description')
const projectContainer = document.querySelector('#projects-container')
const projectConfirm = document.querySelector('#project-confirm')

const body = document.body
// window.addEventListener('DOMContentLoaded', projectModal)

let projects = []


class Project {
    constructor(projectName, projectDescription){
        this._projectName = projectName
        this._projectDescription = projectDescription
        this._tasks = []
    }

    get name(){
        let capitalizedName = this._projectName.charAt(0).toUpperCase() + this._projectName.slice(1)
        return capitalizedName
    }
    get desc(){
        return this._projectDescription
    }
    get tasks(){
        return this._tasks
    }
}

function submitProject(event){
    event.preventDefault()

    projectContainer.innerHTML = ''

    let name = projectName.value
    let desc = projectDescription.value

    let newObj = new Project(name, desc)
    
    projectName.value = ''
    projectDescription.value = ''

    projects.push(newObj)
    projects.forEach((object, index)=>{
        let project = addProjectContent(object.name)
    
        // projectDom.push(project)
        projectContainer.appendChild(project)
        
        project.addEventListener('click', ()=>{
            let projectDom = Array.from(document.querySelectorAll('.project-content'))
            projectDom.forEach(div =>{
                if(div.classList.contains('focus')){
                    div.classList.remove('focus')
                }
            })
            project.classList.add('focus')

            // console.log(projects[index])

            // document.querySelector('#top-main > h2').textContent = object.name
            // alert(object.tasks.length)

            const dialogAnchor = document.getElementById('project-dialog')
            const main = document.getElementById('main-container')
            main.innerHTML = ''
            const mainDiv = makeAnElement('div', 'main-content')
            main.appendChild(mainDiv)

            const topMain = makeAnElement('div', 'top-main')
            const title = makeAnElement('h2', '')
            title.textContent = object.name
            const donutCat = makeAnElement('img', '')
            donutCat.src = cat
            appendMe(topMain, title, donutCat)

            const centerMain = makeAnElement('div', 'center-main')
            
            const newTaskButton = makeAnElement('button', 'new-task-button')
            newTaskButton.textContent = 'Add Task'
            appendMe(mainDiv, topMain, centerMain, newTaskButton)
            body.insertBefore(main, dialogAnchor)
            displayTask(index)

            if(!object.tasks.length){
                centerMain.appendChild(noTasksHeading())
            }

            newTaskButton.addEventListener('click', ()=>{
                const dialog = makeAnElement('dialog', 'project-dialog')
                body.appendChild(dialog)
                const content = makeAContent('', '', false)
                dialog.appendChild(content.container)
                dialog.showModal()

                content.container.addEventListener('submit', (e)=>{
                    e.preventDefault()
                    const task = {
                        name : content.container.querySelector('#project-name').value,
                        desc : content.container.querySelector('#project-description').value,
                        dueTo : content.container.querySelector('#date-input').value,
                        dif: content.container.querySelector('#select-dif').value,

                    }
                    projects[index].tasks.push(task)
                    if(projects[index].tasks.length > 6 && !centerMain.classList.contains('scroll')){
                        centerMain.classList.add('scroll')
                    }
                    else if(projects[index].tasks.length < 7 && centerMain.classList.contains('scroll')){
                        centerMain.classList.remove('scroll')
                    }
                    console.log(projects[index].tasks)
                    displayTask(index)
                    dialog.close()                    
                    setTimeout(bodyRemoveDial, 501)
                })
            })

        })
    })
    
    projectDialog.close()
}

function displayTask(projectIndex){
    const container = document.getElementById('center-main')
    container.innerHTML = ''
    newTask(container, projectIndex) 
}

function newTask(container, projectIndex){
    projects[projectIndex].tasks.forEach((task, taskIndex) =>{
        const li =  newTaskDOM(task.name, task.dueTo, task.dif)
        li.querySelector('#edit-task').addEventListener('click', ()=>{
            editButton(li, projectIndex, task, taskIndex, 'edit')       
            // const difMeter = li.querySelector('#dif-meter')
            // const taskName = li.querySelector('#task-name')
            // const date = li.querySelector('#date')
            // const content = makeAContent(taskName.textContent, task.desc, task.dueTo, task.dif , 'edit')
            // const dialog = makeAnElement('dialog', 'project-dialog')
            // dialog.appendChild(content.container)
            // body.appendChild(dialog)
            // dialog.showModal()
            
            // content.container.addEventListener('submit', (e)=>{
            //     e.preventDefault()
            //     taskName.textContent = content.title.value
            //     date.textContent = format(content.dateDue.value, 'dd-MM-yyyy')
            //     diffMeterValue(difMeter, content.difficulty.value)
            //     projects[projectIndex].tasks[taskIndex].name = content.title.value
            //     projects[projectIndex].tasks[taskIndex].desc = content.script.value
            //     projects[projectIndex].tasks[taskIndex].dueTo = content.dateDue.value
            //     projects[projectIndex].tasks[taskIndex].dif = content.difficulty.value
                
            //     dialog.close()
            //     setTimeout(bodyRemoveDial, 501);

            // })
        })
        li.querySelector('#read-task').addEventListener('click', ()=>{
            editButton(li, projectIndex, task, taskIndex, 'read')  
        })
        li.querySelector('#delete-task').addEventListener('click', ()=>{
            const centerMain = document.getElementById('center-main')
            li.classList.add('erase')
            setTimeout(()=>{
                deleteTask(projectIndex, taskIndex)
                centerMain.removeChild(li)
                
                setTimeout(() => {
                    if(!projects[projectIndex].tasks.length){
                        console.log(true)
                        centerMain.appendChild(noTasksHeading())
                    }else{console.log(false)}
                },1)
            },499);
        })
        container.appendChild(li)
    })
}


function makeAnElement(eleName, id = '' , group = ''){
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

function projectModal(){
    projectDialog.showModal()
    form.addEventListener('submit', submitProject)
}

function editTask(){
    console.log(projects)
}

function editButton(parent, parentIndex, object, objectIndex, status){
    const difMeter = parent.querySelector('#dif-meter')
    const taskName = parent.querySelector('#task-name')
    const date = parent.querySelector('#date')
    const content = makeAContent(taskName.textContent, object.desc, object.dueTo, object.dif , status)
    const dialog = makeAnElement('dialog', 'project-dialog')
    dialog.appendChild(content.container)
    body.appendChild(dialog)
    dialog.showModal()
            
    content.container.addEventListener('submit', (e)=>{
        e.preventDefault()
        taskName.textContent = content.title.value
        date.textContent = format(content.dateDue.value, 'dd-MM-yyyy')
        diffMeterValue(difMeter, content.difficulty.value)
        if(status === 'edit'){
            editFunction(parentIndex, objectIndex, content)
        }
        dialog.close()
        setTimeout(bodyRemoveDial, 501);
    })
}

function editFunction(parentIndex, objectIndex, contentObject){
    projects[parentIndex].tasks[objectIndex].name = contentObject.title.value
    projects[parentIndex].tasks[objectIndex].desc = contentObject.script.value
    projects[parentIndex].tasks[objectIndex].dueTo = contentObject.dateDue.value
    projects[parentIndex].tasks[objectIndex].dif = contentObject.difficulty.value
}

function deleteTask(parentIndex, objectIndex){
    let removeTask = projects[parentIndex].tasks[objectIndex]
    projects[parentIndex]._tasks = projects[parentIndex]._tasks.filter(task => task !== removeTask)  
    console.log(projects[parentIndex].tasks)
}


function noTasksHeading(){
    const h3 = makeAnElement('h3', 'no-task-heading')
    h3.style.textAlign = 'center'
    h3.textContent = "You Don't Have any task here yet"
    return h3
}

export { projectModal, makeAnElement, appendMe, editTask , projects} 

