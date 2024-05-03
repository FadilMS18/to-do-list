import {differenceInCalendarDays, format, isAfter, isBefore, isDate, isFuture } from "date-fns"
import { readEditButton, allTask, upcomingTask, importantTask, noTasksHeading, todayTask } from "./newProject"
import { newTaskDOM } from "./taskEdit"
export let test = 'test'
// isAfter(isThisAfter, this)
// differenceInCalenderDays(andThisDate, CompareThisDate)


export const timeButton = Array.from(document.querySelectorAll('.due-to-button'))
timeButton.forEach(button =>{
    button.addEventListener('click', (e)=>{
        if(e.target.classList.contains('fokus')){return}
        timeButton.forEach(but=>{but.classList.value = 'due-to-button'})
        
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

timeButton[0].addEventListener('click', ()=>{
    displayAllTask(allTask, timeButton[0].textContent)
})
timeButton[1].addEventListener('click', ()=>{
    displayAllTask(todayTask, timeButton[1].textContent)
})
timeButton[2].addEventListener('click', ()=>{
    displayAllTask(upcomingTask, timeButton[2].textContent)
})

let now = new Date()
let yesterday = new Date(2024, 4, 0)
let tomorrow = new Date(2024, 4, 2)
let today = format(now, 'dd-MM-yyyy')

function displayAllTask(taskType, title){
    document.querySelector('#top-main > h2').textContent = `${title} tasks`
    const container = document.getElementById('center-main')
    container.innerHTML = ''
    showAllTask(container, taskType)
}   

function showAllTask(container, taskType){
    if(!taskType.length){
        container.appendChild(noTasksHeading())
    }else{
        taskType.forEach(task =>{
            const li = newTaskDOM(task.name, task.dueTo, task.dif, task.taskStatus)
            const buttonContainer = li.querySelector('#button-container')
            let editButton = buttonContainer.querySelector('#edit-task')
            let deleteButton = buttonContainer.querySelector('#delete-task')
            buttonContainer.removeChild(editButton)
            buttonContainer.removeChild(deleteButton)

            li.querySelector('#read-task').addEventListener('click', ()=>{
                readEditButton(li, false, task, false, 'read')
            })
            
            container.appendChild(li)
        })
    }
}

const testDiv = document.getElementById('date-test')
testDiv.addEventListener('click', ()=>{
    const difMeter = testDiv.querySelector('#dif-meter')
    if(difMeter.classList.contains('complete')){
        difMeter.classList.remove('complete') 
        testDiv.classList.remove('complete')
    }else{
        difMeter.classList.add('complete') 
        testDiv.classList.add('complete');
    }
})



// console.log(today)
// console.log(yesterday)
// console.log(tomorrow)
// console.log(Boolean( 1 <= differenceInCalendarDays(tomorrow, now)))

// const date = document.querySelector('#button-container > input')
// const img = document.querySelector('#button-container > img')
// date.addEventListener('change', ()=>{
//     console.log(`${date.value} = ${now}`)
//     console.log(isBefore(date.value, now))
// })
