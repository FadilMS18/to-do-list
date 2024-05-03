import { addProjectContent } from "./first"
import { donutCat as cat } from "./svg"
import { makeAContent, newTaskDOM, bodyRemoveDial, diffMeterValue, dateRange } from "./taskEdit"
import { differenceInCalendarDays, format } from "date-fns"
import { pushTask, todayOrUpcoming } from "./checkDueTo"
import { timeButton } from "./allTaskDOM"


const projectDialog = document.querySelector('#project-dialog')

const form = document.querySelector('#project-form')
const projectName = document.querySelector('#project-name')
const projectDescription = document.querySelector('#project-description')
const projectContainer = document.querySelector('#projects-container')
const projectConfirm = document.querySelector('#project-confirm')

const body = document.body
// window.addEventListener('DOMContentLoaded', projectModal)

let projects = []
let todayTask = []
let upcomingTask = []
let allTask = []
let importantTask = []


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
            timeButton.forEach(button =>{
                if(button.classList.contains('fokus')){button.classList.remove('fokus')}
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
            title.textContent = `Project ${object.name}`
            const donutCat = makeAnElement('img', '')
            donutCat.src = cat
            appendMe(topMain, title, donutCat)

            const centerMain = makeAnElement('div', 'center-main')
            
            const newTaskButton = makeAnElement('button', 'new-task-button')
            newTaskButton.textContent = 'Add Task'
            appendMe(mainDiv, topMain, centerMain, newTaskButton)
            body.insertBefore(main, dialogAnchor)
            displayProjectTask(index)

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
                        projectIndex : index,
                        taskStatus : false,

                    }
                    projects[index].tasks.push(task)
                    /* mengirim task baru ke array baru baik itu 
                        pushTask(task.dueTo, task)
                        console.log(todayTask)
                        console.log(upcomingTask)
                    
                    */
                //    pushTask(task.dueTo, task.dif, task)
                //    console.log(importantTask)
                    todayUpcomingTaskUpdate(projects, index)
                    // console.log(todayTask)
                    // console.log(upcomingTask)
                    // console.log(allTask)
                    
                    if(projects[index].tasks.length > 6 && !centerMain.classList.contains('scroll')){
                        centerMain.classList.add('scroll')
                    }
                    else if(projects[index].tasks.length < 7 && centerMain.classList.contains('scroll')){
                        centerMain.classList.remove('scroll')
                    }
                    console.log(projects[index].tasks)

                    displayProjectTask(index)
                    dialog.close()                    
                    setTimeout(bodyRemoveDial, 501)
                })
            })

        })
    })
    
    projectDialog.close()
}

function displayProjectTask(projectIndex){
    const container = document.getElementById('center-main')
    container.innerHTML = ''
    newTask(container, projectIndex)
}


function newTask(container, projectIndex){
    projects[projectIndex].tasks.forEach((task, taskIndex) =>{
        task.index = taskIndex
        const li =  newTaskDOM(task.name, task.dueTo, task.dif, task.taskStatus)
        li.querySelector('#finish-task').addEventListener('click', ()=>{
            finishTask(li, projectIndex, taskIndex)
        })

        li.querySelector('#edit-task').addEventListener('click', ()=>{
            readEditButton(li, projectIndex, task, taskIndex, 'edit')       
        })
        li.querySelector('#read-task').addEventListener('click', ()=>{
            readEditButton(li, projectIndex, task, taskIndex, 'read')  
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


function readEditButton(parent, parentIndex, object, objectIndex, status){
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
        dateRange(date, differenceInCalendarDays(content.dateDue.value, new Date()))
        diffMeterValue(difMeter, content.difficulty.value, object.taskStatus)
        console.log(content.dateDue.value)
        console.log(differenceInCalendarDays(content.dateDue.value, new Date()))
        if(status === 'edit'){
            editFunction(parentIndex, objectIndex, content)
        }
        dialog.close()
        setTimeout(bodyRemoveDial, 501);
    })
}

function finishTask(ele, parentIndex, objectIndex){
    const element = ele
    const dif = ele.querySelector('#dif-meter')
    if(ele.classList.contains('complete')){
        ele.classList.remove('complete')
        dif.classList.remove('complete')
        changeFinishStatus(parentIndex, objectIndex, false)
    }else{
        ele.classList.add('complete')
        dif.classList.add('complete')
        changeFinishStatus(parentIndex, objectIndex, true)
    }
}

function changeFinishStatus(parentIndex, objectIndex, status){
    projects[parentIndex].tasks[objectIndex].taskStatus = status 
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
    // console.log(projects[parentIndex].tasks)
    setTimeout(todayUpcomingTaskUpdate(projects), 500)
    console.log(todayTask)
    console.log(upcomingTask)
}


function noTasksHeading(){
    const h3 = makeAnElement('h3', 'no-task-heading')
    h3.style.textAlign = 'center'
    h3.textContent = "You Don't Have any task here yet"
    return h3
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

function todayUpcomingTaskUpdate(array){
    todayTask = []
    upcomingTask = []
    allTask = []
    array.forEach(arr =>{
        if(arr.tasks.length){
            arr.tasks.forEach(task =>{
                allTask.push(task)
                switch(todayOrUpcoming(task.dueTo)){
                    case 'today':
                        todayTask.push(task)
                        break;
                    case 'upcoming':
                        upcomingTask.push(task)
                        break;    
                }
            })
        }
    })
}

/*
    Terakhir kali kita menambahkan project index dan task index kedalam task project
*/ 


export { projectModal, makeAnElement, appendMe, editTask , projects, todayTask, upcomingTask, importantTask, allTask, readEditButton, noTasksHeading} 

