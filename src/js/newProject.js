import { makeAnElement, appendMe} from "./otherModule"
import { donutCat as cat, projectSvg } from "./svg"
import { makeAContent, newTaskDOM,addProjectContent, bodyRemoveDial} from "./projectMaker"
import {differenceInCalendarDays, format } from "date-fns"
import { checkImportant, todayOrUpcoming, dateRange, diffMeterValue } from "./checkDueTo"
import { Sidebar} from "./sidebarHandler"
import { Chest } from './LocalStorageHandler'



class ToDo{
    static projects = []
    static todayTask = []
    static upcomingTask = []
    static allTask = []
    static importantTask = []
}

class Project {
    constructor(projectName, projectDescription, icon){
        this._projectName = projectName
        this._projectDescription = projectDescription
        this._icon = icon
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
    get icon(){
        return this._icon
    }
}


const projectDialog = document.querySelector('#project-dialog')

const projectIcons = Array.from(document.querySelectorAll('.project-icon'))

projectIcons.forEach(icon =>{
    icon.addEventListener('click', (e)=>{
        if(e.target.classList.contains('selected')){
            return
        }
        projectIcons.forEach(icons=>{
            if(icons.classList.contains('selected')){
                icons.classList.remove('selected')
            }
            icons.classList.add('not-selected')
        })
        e.target.classList.remove('not-selected')
        e.target.classList.add('selected')
    })
})


const body = document.body


function submitProject(event){
    event.preventDefault()
    const projectContainer = document.querySelector('#projects-container')
    const projectName = document.querySelector('#project-name')
    const projectDescription = document.querySelector('#project-description')
    let focusIndex = ''


    const manyProject = Array.from(document.querySelectorAll('.project-content'))
    if(manyProject.length){
        manyProject.forEach((ele, index)=>{
            if(ele.classList.contains('focus')){
                focusIndex = index
            }
        })
    }
    projectContainer.innerHTML = ''

    let selectedIconIndex = document.querySelector('img.selected').getAttribute('value')

    let newObj = new Project(projectName.value, projectDescription.value, selectedIconIndex)
    projectName.value = ''
    projectDescription.value = ''
    resetProjectDialog(projectIcons, projectName, projectDescription)

    if(Chest.getItem('projects') ){
        if(ToDo.projects.length < Chest.getFromStorage('projects').length){
            ToDo.projects = Chest.getFromStorage('projects')
        }
    }
    ToDo.projects.push(newObj)
    if(!Chest.getItem('projects') || Chest.getItem('projects') && ToDo.projects.length > Chest.getFromStorage('projects').length){
        Chest.setItemsToStorage('projects', ToDo.projects)
    }
    
    
    // let getProjects = Chest.getFromStorage('projects')
    // console.log(getProjects)
    console.log(ToDo.projects)
    // ToDo.forEach((object, index)=>{
    //     let projectDom = Array.from(document.querySelectorAll('.project-content'))
    //     let project = addProjectContent(object.name, projectSvg[object.icon])
        
    //     projectContainer.appendChild(project)
        
    //     project.addEventListener('click', ()=>{
    //         projectDom.forEach(div =>{
    //             if(div.classList.contains('focus')){
    //                 div.classList.remove('focus')
    //             }
    //         })
    //         Sidebar.timeButton.forEach(button =>{
    //             if(button.classList.contains('fokus')){button.classList.remove('fokus')}
    //         })
    //         project.classList.add('focus')

    //         const dialogAnchor = document.getElementById('project-dialog')
    //         const main = document.getElementById('main-container')
    //         main.innerHTML = ''
    //         const mainDiv = makeAnElement('div', 'main-content')
    //         main.appendChild(mainDiv)

    //         const topMain = makeAnElement('div', 'top-main')
    //         const title = makeAnElement('h2', '')
    //         title.textContent = `Project ${object.name}`
    //         const donutCat = makeAnElement('img', '')
    //         donutCat.src = cat
    //         appendMe(topMain, title, donutCat)

    //         const centerMain = makeAnElement('div', 'center-main')
            
    //         const newTaskButton = makeAnElement('button', 'new-task-button')
    //         newTaskButton.textContent = 'Add Task'
    //         appendMe(mainDiv, topMain, centerMain, newTaskButton)
    //         body.insertBefore(main, dialogAnchor)
    //         displayProjectTask(index)

    //         if(!object.tasks.length){
    //             centerMain.appendChild(noTasksHeading())
    //         }

    //         newTaskButton.addEventListener('click', ()=>{
    //             const dialog = makeAnElement('dialog', 'project-dialog')
    //             body.appendChild(dialog)
    //             const content = makeAContent('', '', false)
    //             dialog.appendChild(content.container)
    //             dialog.showModal()

    //             content.container.addEventListener('submit', (e)=>{
    //                 e.preventDefault()
    //                 const task = {
    //                     name : content.container.querySelector('#project-name').value,
    //                     desc : content.container.querySelector('#project-description').value,
    //                     dueTo : content.container.querySelector('#date-input').value,
    //                     dif: content.container.querySelector('#select-dif').value,
    //                     projectIndex : index,
    //                     taskStatus : false,

    //                 }
    //                 ToDo.projects[index].tasks.push(task)

    //                 todayUpcomingTaskUpdate(ToDo.projects, index)
                    
                    
    //                 if(ToDo.projects[index].tasks.length > 6 && !centerMain.classList.contains('scroll')){
    //                     centerMain.classList.add('scroll')
    //                 }
    //                 else if(ToDo.projects[index].tasks.length < 7 && centerMain.classList.contains('scroll')){
    //                     centerMain.classList.remove('scroll')
    //                 }
    //                 console.log(ToDo.projects[index].tasks)

    //                 displayProjectTask(index)
    //                 dialog.close()                    
    //                 setTimeout(bodyRemoveDial, 501)
    //             })
    //         })

    //     })
    // })
    // if(focusIndex !== ''){
    //     let focusProject = Array.from(document.querySelectorAll('.project-content'))
    //     focusProject[focusIndex].classList.add('focus')
    // }
    projectHandler(ToDo, projectContainer, focusIndex)
    projectDialog.close()
}

function displayProjectTask(projectIndex){
    const container = document.getElementById('center-main')
    container.innerHTML = ''
    newTask(container, projectIndex)
    console.log(ToDo.projects)
}


function newTask(container, projectIndex){
    ToDo.projects[projectIndex].tasks.forEach((task, taskIndex) =>{
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
            handleDeleteTask(li, task)  
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
    ToDo.projects[parentIndex].tasks[objectIndex].taskStatus = status 
    Chest.setItemsToStorage('projects', ToDo.projects)
}

function editFunction(parentIndex, objectIndex, contentObject){
    ToDo.projects[parentIndex].tasks[objectIndex].name = contentObject.title.value
    ToDo.projects[parentIndex].tasks[objectIndex].desc = contentObject.script.value
    ToDo.projects[parentIndex].tasks[objectIndex].dueTo = contentObject.dateDue.value
    ToDo.projects[parentIndex].tasks[objectIndex].dif = contentObject.difficulty.value
    Chest.setItemsToStorage('projects', ToDo.projects)
}

function handleDeleteTask(element, object, projects = true, taskType = false){
    const centerMain = document.getElementById('center-main')
    element.classList.add('erase')
    setTimeout(()=>{
            deleteProjectTask(object.projectIndex, object.index)
            centerMain.removeChild(element)
            setTimeout(() => {
                if(!ToDo.projects[object.projectIndex].tasks.length && projects){
                    centerMain.appendChild(noTasksHeading())
                }
                if(taskType){
                    switch (taskType) {
                        case 'all':
                            if(!ToDo.allTask.length){centerMain.appendChild(noTasksHeading())}
                            break;
                        case 'today':
                            if(!ToDo.todayTask.length){centerMain.appendChild(noTasksHeading())}
                            break;
                        case 'upcoming':
                            if(!ToDo.upcomingTask.length){centerMain.appendChild(noTasksHeading())}
                            break;
                        case 'important':
                            if(!ToDo.importantTask.length){centerMain.appendChild(noTasksHeading())}
                            break;
                    }
                }
            },1)
    },399);
}

function deleteProjectTask(parentIndex, objectIndex){
    let removeTask = ToDo.projects[parentIndex].tasks[objectIndex]
    ToDo.projects[parentIndex]._tasks = ToDo.projects[parentIndex]._tasks.filter(task => task !== removeTask)  
    setTimeout(todayUpcomingTaskUpdate(ToDo.projects), 400)
    Chest.setItemsToStorage('projects', ToDo.projects)
    console.log(ToDo.allTask)
    console.log(ToDo.todayTask)
    console.log(ToDo.upcomingTask)
}


function noTasksHeading(){
    const h3 = makeAnElement('h3', 'no-task-heading')
    h3.style.textAlign = 'center'
    h3.textContent = "You Don't Have any task here yet"
    return h3
}



function projectModal(){
    projectDialog.showModal()
    const form = document.querySelector('#project-form')
    form.addEventListener('submit', submitProject)
}

function todayUpcomingTaskUpdate(array){    
    ToDo.todayTask = []
    ToDo.upcomingTask = []
    ToDo.allTask = []
    ToDo.importantTask = []

    array.forEach(arr =>{
        if(arr.tasks.length){
            arr.tasks.forEach(task =>{
                ToDo.allTask.push(task)
                switch(todayOrUpcoming(task.dueTo)){
                    case 'today':
                        ToDo.todayTask.push(task)
                        break;
                    case 'upcoming':
                        ToDo.upcomingTask.push(task)
                        break;    
                }
                checkImportant(task.dif, task)
            })
        }
    })
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

const time = Array.from(document.querySelectorAll('.due-to-button'))
console.log(time)

function projectHandler(array, projectContainer, focusIndex){
    array.projects.forEach((object, index)=>{
        let project = addProjectContent(object.name, projectSvg[object.icon])
        
        projectContainer.appendChild(project)

        project.addEventListener('click', ()=>{
            let projectDom = Array.from(document.querySelectorAll('.project-content'))
            projectDom.forEach(div =>{
                if(div.classList.contains('focus')){
                    div.classList.remove('focus')
                }
            })
            Sidebar.timeButton.forEach(button =>{
                if(button.classList.contains('fokus')){button.classList.remove('fokus')}
            })
            project.classList.add('focus')
    
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
                    array.projects[index].tasks.push(task)
    
                    todayUpcomingTaskUpdate(array.projects, index)
                    Chest.setItemsToStorage('projects', ToDo.projects)

                    if(array.projects[index].tasks.length > 6 && !centerMain.classList.contains('scroll')){
                        centerMain.classList.add('scroll')
                    }
                    else if(array.projects[index].tasks.length < 7 && centerMain.classList.contains('scroll')){
                        centerMain.classList.remove('scroll')
                    }
                    
                    console.log(array.projects[index].tasks)
    
                    displayProjectTask(index)
                    dialog.close()                    
                    setTimeout(bodyRemoveDial, 501)
                })
            })
    
        })
    })
    if(focusIndex !== ''){
        let focusProject = Array.from(document.querySelectorAll('.project-content'))
        focusProject[focusIndex].classList.add('focus')
    }
}
function storageProjectHandler(array, projectContainer, focusIndex){
    array.forEach((object, index)=>{
        let project = addProjectContent(object.name, projectSvg[object.icon])
        
        projectContainer.appendChild(project)

        project.addEventListener('click', ()=>{
            let projectDom = Array.from(document.querySelectorAll('.project-content'))
            console.log(projectDom)
            projectDom.forEach(div =>{
                if(div.classList.contains('focus')){
                    div.classList.remove('focus')
                }
            })
            Sidebar.timeButton.forEach(button =>{
                if(button.classList.contains('fokus')){button.classList.remove('fokus')}
            })
            project.classList.add('focus')
    
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
                    ToDo.projects[index].tasks.push(task)
                    todayUpcomingTaskUpdate(ToDo.projects, index)

                    Chest.setItemsToStorage('projects', ToDo.projects)
                    
                    if(ToDo.projects[index].tasks.length > 6 && !centerMain.classList.contains('scroll')){
                        centerMain.classList.add('scroll')
                    }
                    else if(ToDo.projects[index].tasks.length < 7 && centerMain.classList.contains('scroll')){
                        centerMain.classList.remove('scroll')
                    }
                        
                    displayProjectTask(index)
                    dialog.close()          
                    setTimeout(bodyRemoveDial, 501)
                })
            })
    
        })
    })
    if(focusIndex !== ''){
        let focusProject = Array.from(document.querySelectorAll('.project-content'))
        focusProject[focusIndex].classList.add('focus')
    }
}

export { projectModal,finishTask, todayUpcomingTaskUpdate, bodyRemoveDial,readEditButton, noTasksHeading, handleDeleteTask,storageProjectHandler, ToDo} 

