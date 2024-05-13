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

function pushArray(parent, ...array){
    array.forEach(arr =>{ parent.push(arr)})
}

export{ makeAnElement, appendMe, pushArray}





// ToDo.projects.forEach((object, index)=>{
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