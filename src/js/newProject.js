import { addProjectContent } from "./first"
import { donutCat as cat } from "./svg"
import { makeAContent, newTaskDOM, manyTask, bodyRemoveDial } from "./taskEdit"


const projectDialog = document.querySelector('#project-dialog')

const form = document.querySelector('#project-form')
const projectName = document.querySelector('#project-name')
const projectDescription = document.querySelector('#project-description')
const projectContainer = document.querySelector('#projects-container')
const projectConfirm = document.querySelector('#project-confirm')

const body = document.body
window.addEventListener('DOMContentLoaded', projectModal)

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
        projectContainer.appendChild(project)
        project.addEventListener('click', ()=>{
            project.classList.contains('focus') 
            ? project.classList.remove('focus') 
            : project.classList.add('focus')

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
                const h3 = makeAnElement('h3', 'no-task-heading')
                h3.style.textAlign = 'center'
                h3.textContent = "You Don't Have any task here yet"
                centerMain.appendChild(h3)
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
                        desc : content.container.querySelector('#project-description').value
                    }
                    projects[index].tasks.push(task)
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
        const li =  newTaskDOM(task.name)
        li.querySelector('#edit-task').addEventListener('click', ()=>{
            const taskName = li.querySelector('#task-name')
            const content = makeAContent(taskName.textContent, 'testing here', 'edit')
            const dialog = makeAnElement('dialog', 'project-dialog')
            dialog.appendChild(content.container)
            body.appendChild(dialog)
            dialog.showModal()
            
            content.container.addEventListener('submit', (e)=>{
                e.preventDefault()
                taskName.textContent = content.title.value
                projects[projectIndex].tasks[taskIndex].name = content.title.value
                dialog.close()
                setTimeout(bodyRemoveDial, 501);

            })
        })
        container.appendChild(li)
    })
}

function makeAnElement(eleName, id, group = ''){
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

console.log(projects.tasks)

export { projectModal, makeAnElement, appendMe, editTask , projects} 

