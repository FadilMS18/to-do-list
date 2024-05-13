import './css/style.css'
import './css/dialog.css'
import './css/main.css'
import { makeNavbar} from './js/navbarHandler'
import {projectModal, ToDo, storageProjectHandler } from './js/newProject'
import { Sidebar, loadFirstPage, topSideBarEvent } from './js/sidebarHandler'
import { b, Chest } from './js/LocalStorageHandler'

const body = document.body

const Start = (function(){
    body.insertBefore(makeNavbar(), body.firstChild)
    body.insertBefore(Sidebar.sidebarDom, document.querySelector('#main-container'))

    topSideBarEvent(Sidebar)
    setTimeout(()=>{
        loadFirstPage()
    },1)
    
})()

// Sidebar left & right

Sidebar.opener.addEventListener('click', ()=>{
    if(!Sidebar.opener.classList.contains('sidebar-close')){
        const sidebar = document.querySelector('#sidebar')
        sidebar.classList.add('sidebar-container-close')
        Sidebar.opener.classList.add('sidebar-close')
        document.getElementById('main-container').classList.add('go-left')
    }else{
        const sidebar = document.querySelector('#sidebar')
        sidebar.classList.remove('sidebar-container-close')
        Sidebar.opener.classList.remove('sidebar-close')
        document.getElementById('main-container').classList.remove('go-left')
    }
})

// Add New project modal
const addNewProject = Sidebar.sidebarProjectButton
addNewProject.addEventListener('click', projectModal)

window.addEventListener('DOMContentLoaded', ()=>{
    if(Chest.getItem('projects') ){
        if(ToDo.projects.length < Chest.getFromStorage('projects').length){
            ToDo.projects = Chest.getFromStorage('projects')
        }
    }
    
    if(!Chest.getItem('projects') || Chest.getItem('projects') && ToDo.projects.length > Chest.getFromStorage('projects').length){
        Chest.setItemsToStorage('projects', ToDo.projects)
    }
    
    if(Chest.getItem('projects')){
        let getStorage = Chest.getFromStorage('projects')
        console.log(getStorage)
        let projectContainer = document.querySelector('#projects-container')
        let focusIndex = ''
        storageProjectHandler(getStorage, projectContainer,focusIndex )
    }else{
        console.log('Something is wrong')
    }
    
})




console.log('Type localStorage.clear() to delete all the Projects & tasks :)')