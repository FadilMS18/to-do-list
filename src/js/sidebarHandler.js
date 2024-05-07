import { readEditButton, finishTask, handleDeleteTask, allTask, upcomingTask, importantTask, noTasksHeading, todayTask } from "./newProject"
import { newTaskDOM } from "./projectMaker"
import { makeAnElement, appendMe, pushArray } from "./otherModule"
import { leftOpener } from "./svg"
export let test = 'test'
// isAfter(isThisAfter, this)
// differenceInCalenderDays(andThisDate, CompareThisDate)

// export const timeButton = Array.from(document.querySelectorAll('.due-to-button'))


function displayAllTask(taskType, title){

    document.querySelector('#top-main > h2').textContent = `${title} Tasks`
    const container = document.getElementById('center-main')
    const mainContainer = container.parentNode
    container.innerHTML = ''
    showAllTask(container, taskType)
    if(mainContainer.querySelector('#new-task-button')){
        const removeButton = document.querySelector('#new-task-button')
        mainContainer.removeChild(removeButton)
    }
}   

function showAllTask(container, taskType){
    if(!taskType.length){
        container.appendChild(noTasksHeading())
    }else{
        taskType.forEach(task =>{
            const li = newTaskDOM(task.name, task.dueTo, task.dif, task.taskStatus)
            const buttonContainer = li.querySelector('#button-container')
            let editButton = buttonContainer.querySelector('#edit-task')
            buttonContainer.removeChild(editButton)

            li.querySelector('#finish-task').addEventListener('click', ()=>{
                finishTask(li, task.projectIndex, task.index)
            })

            li.querySelector('#read-task').addEventListener('click', ()=>{
                readEditButton(li, false, task, false, 'read')
            })
            li.querySelector('#delete-task').addEventListener('click', ()=>{
                handleDeleteTask(li, task)
            })
            
            container.appendChild(li)
        })
    }
}

class Sidebar {
    static _timeButton = []
    
    static _sidebarProjectButton = ''

    static _opener = ''

    static _sidebarDom(){
        const side = makeAnElement('aside','sidebar')
    
        const topSide = makeAnElement('div', 'top-sidebar')
        const all = makeAnElement('button', '', 'due-to-button fokus')
        all.textContent = 'All'
        const today = makeAnElement('button', '', 'due-to-button')
        today.textContent = 'Today'
        const upcoming = makeAnElement('button', '', 'due-to-button ')
        upcoming.textContent = 'Upcoming'
        const important = makeAnElement('button', '', 'due-to-button ')
        important.textContent = 'Important'
        appendMe(topSide, all, today, upcoming, important)
        pushArray(Sidebar._timeButton, all, today, upcoming, important)
    
        const legend = makeAnElement('h2', 'projects-legend')
        legend.textContent = 'Projects'
    
        const projectContainer = makeAnElement('div', 'projects-container')
    
        const newProjectButton = makeAnElement('button', 'add-new-project')
        newProjectButton.textContent = 'Add New Project'
        Sidebar._sidebarProjectButton = newProjectButton
    
        const sidebarOpener = makeAnElement('span', 'sidebar-opener')
        const img = makeAnElement('img')
        img.src = leftOpener
        Sidebar._opener = sidebarOpener 

        appendMe(sidebarOpener, img)
        appendMe(side, topSide, legend, projectContainer, newProjectButton, sidebarOpener)
        return side
    }

    static get sidebarDom(){
        return Sidebar._sidebarDom()
    }

    static get timeButton(){
        return Sidebar._timeButton
    }

    static get sidebarProjectButton(){
        return Sidebar._sidebarProjectButton
    }

    static get opener(){
        return Sidebar._opener
    }
}

function topSideBarEvent(element){
    element.timeButton.forEach(button =>{
        button.addEventListener('click', (e)=>{
            if(e.target.classList.contains('fokus')){return}
            element.timeButton.forEach(but=>{but.classList.value = 'due-to-button'})
            
            if(document.querySelectorAll('.project-content')){
                const projectContents =  Array.from(document.querySelectorAll('.project-content'))
                projectContents.forEach(project =>{
                    if(project.classList.contains('focus')){
                        project.classList.remove('focus')
                    }
                })
            }
            e.target.classList.add('fokus')
        })
    })
    
    element.timeButton[0].addEventListener('click', ()=>{
        displayAllTask(allTask, element.timeButton[0].textContent)   
    })
    
    element.timeButton[1].addEventListener('click', ()=>{
        displayAllTask(todayTask, element.timeButton[1].textContent)
    })
    element.timeButton[2].addEventListener('click', ()=>{
        displayAllTask(upcomingTask, element.timeButton[2].textContent)
    })
    element.timeButton[3].addEventListener('click', ()=>{
        displayAllTask(importantTask, element.timeButton[3].textContent)
    })
}




console.log(Sidebar._timeButton)
export {Sidebar, topSideBarEvent}